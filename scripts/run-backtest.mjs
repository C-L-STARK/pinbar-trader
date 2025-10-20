#!/usr/bin/env node

/**
 * Standalone Backtest Script
 *
 * Run backtest from command line:
 * node scripts/run-backtest.js
 */

import { BinanceConnector } from '../src/lib/trading/connectors/binance.js';
import { BacktestEngine } from '../src/lib/trading/backtest/engine.js';

async function runBacktest() {
  console.log('🚀 Starting XAUUSD Backtest...\n');

  // Configuration
  const initialCapital = 10000;
  const symbol = 'XAUUSDT';
  const interval = '1m';

  // Updated risk parameters
  const tradingConfig = {
    symbol,
    interval,
    strategy: {
      aggressiveness: 2, // Moderate
      trailingActivation: 0.8,
      trailingDistance: 1.0,
      indicators: {
        keltner: {
          maPeriod: 15,
          atrPeriod: 10,
          atrMultiple: 0.5,
        },
        bollinger: {
          period: 15,
          deviation: 1.0,
        },
        macd: {
          fastPeriod: 12,
          slowPeriod: 26,
          signalPeriod: 9,
        },
        cci: {
          period: 20,
        },
        supertrend: {
          period: 10,
          multiplier: 3.0,
        },
      },
    },
    risk: {
      maxDailyLoss: initialCapital * 0.05, // 5% daily drawdown ($500)
      maxDrawdown: 0.10, // 10% total drawdown
      maxPositions: 1,
      positionSize: 0.3,
      stopLossMultiple: 1.5,
      takeProfitLevels: [1.5, 2.5, 4.0],
    },
  };

  console.log('📋 Configuration:');
  console.log(`   Symbol: ${symbol}`);
  console.log(`   Interval: ${interval}`);
  console.log(`   Initial Capital: $${initialCapital.toLocaleString()}`);
  console.log(`   Max Daily Loss: $${tradingConfig.risk.maxDailyLoss.toFixed(2)} (5%)`);
  console.log(`   Max Drawdown: ${(tradingConfig.risk.maxDrawdown * 100).toFixed(0)}%`);
  console.log(`   Position Size: ${tradingConfig.risk.positionSize} lots\n`);

  try {
    // Initialize Binance connector
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;
    const useTestnet = process.env.BINANCE_TESTNET === 'true';

    if (!apiKey || !apiSecret) {
      throw new Error('Binance API credentials not found. Please set BINANCE_API_KEY and BINANCE_API_SECRET in .env.local');
    }

    console.log('🔌 Connecting to Binance...');
    const binance = new BinanceConnector({
      apiKey,
      apiSecret,
      testnet: useTestnet,
    });

    // Test connection
    const connected = await binance.testConnection();
    if (!connected) {
      throw new Error('Failed to connect to Binance API');
    }
    console.log('✅ Connected to Binance', useTestnet ? '(Testnet)' : '(Production)', '\n');

    // Date range: Last 7 days
    const endDate = Date.now();
    const startDate = endDate - 7 * 24 * 60 * 60 * 1000;

    console.log('📊 Fetching historical data...');
    console.log(`   Start: ${new Date(startDate).toLocaleString()}`);
    console.log(`   End: ${new Date(endDate).toLocaleString()}\n`);

    // Fetch historical candles
    const candles = await binance.getHistoricalCandles(
      symbol,
      interval,
      1500, // Max candles
      startDate,
      endDate
    );

    console.log(`✅ Fetched ${candles.length} candles\n`);

    // Run backtest
    console.log('🧪 Running backtest...\n');
    const engine = new BacktestEngine({
      startDate,
      endDate,
      initialCapital,
      tradingConfig,
    });

    const results = await engine.runBacktest(candles);

    // Display results
    console.log('═══════════════════════════════════════════════════════');
    console.log('                  BACKTEST RESULTS                     ');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('📈 Performance Metrics:');
    console.log(`   Total Trades: ${results.totalTrades}`);
    console.log(`   Winning Trades: ${results.winningTrades} (${results.winRate.toFixed(1)}%)`);
    console.log(`   Losing Trades: ${results.losingTrades} (${(100 - results.winRate).toFixed(1)}%)`);
    console.log(`   Profit Factor: ${results.profitFactor === Infinity ? '∞' : results.profitFactor.toFixed(2)}`);
    console.log();

    console.log('💰 Profit & Loss:');
    console.log(`   Start Capital: $${results.startCapital.toLocaleString()}`);
    console.log(`   End Capital: $${results.endCapital.toLocaleString()}`);
    console.log(`   Total P&L: ${results.totalPnl >= 0 ? '+' : ''}$${results.totalPnl.toFixed(2)}`);
    console.log(`   Return: ${results.totalPnlPercent >= 0 ? '+' : ''}${results.totalPnlPercent.toFixed(2)}%`);
    console.log();

    console.log('📊 Trade Statistics:');
    console.log(`   Average Win: $${results.averageWin.toFixed(2)}`);
    console.log(`   Average Loss: $${results.averageLoss.toFixed(2)}`);
    console.log(`   Largest Win: $${results.largestWin.toFixed(2)}`);
    console.log(`   Largest Loss: $${results.largestLoss.toFixed(2)}`);
    console.log(`   Trades/Day: ${results.tradesPerDay.toFixed(1)}`);
    console.log();

    console.log('⚠️  Risk Metrics:');
    console.log(`   Max Drawdown: $${results.maxDrawdown.toFixed(2)} (${results.maxDrawdownPercent.toFixed(2)}%)`);
    console.log(`   Daily Loss Limit: $${tradingConfig.risk.maxDailyLoss.toFixed(2)}`);
    console.log(`   Total Drawdown Limit: ${(tradingConfig.risk.maxDrawdown * 100).toFixed(0)}%`);
    console.log();

    console.log('═══════════════════════════════════════════════════════\n');

    // Show trade breakdown by exit reason
    const exitReasons = results.trades.reduce((acc, trade) => {
      const reason = trade.exitReason || 'unknown';
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    }, {});

    console.log('📋 Exit Reasons:');
    Object.entries(exitReasons).forEach(([reason, count]) => {
      const reasonText = {
        'stop_loss': 'Stop Loss',
        'take_profit': 'Take Profit',
        'trailing_stop': 'Trailing Stop',
        'signal': 'Opposite Signal',
        'daily_limit': 'Daily Loss Limit',
        'drawdown_limit': 'Drawdown Limit',
        'unknown': 'Unknown'
      }[reason] || reason;
      console.log(`   ${reasonText}: ${count} (${((count / results.totalTrades) * 100).toFixed(1)}%)`);
    });
    console.log();

    // Save results to file
    const fs = await import('fs/promises');
    const resultsFile = `backtest-results-${Date.now()}.json`;
    await fs.writeFile(resultsFile, JSON.stringify(results, null, 2));
    console.log(`💾 Results saved to: ${resultsFile}\n`);

    console.log('✅ Backtest complete!\n');

  } catch (error) {
    console.error('❌ Backtest failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runBacktest();
