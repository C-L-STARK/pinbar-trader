# Phase 2 Plan: Trading System Migration (Python → TypeScript/Next.js)

## 📋 Overview

Phase 2 will convert the Python-based XAUUSD quantitative trading system to TypeScript/Next.js and integrate with Binance API.

**Estimated Duration**: 4-6 hours
**Complexity**: High (algorithm porting, financial calculations, API integration)

---

## 🎯 Phase 2 Goals

1. ✅ Port XAUUSD trading strategy from Python to TypeScript
2. ✅ Implement all technical indicators in TypeScript
3. ✅ Create backtest engine in TypeScript
4. ✅ Integrate Binance API for live trading (XAUUSD/USDT on Futures)
5. ✅ Build trading dashboard UI
6. ✅ Add profit/loss visualization with charts

---

## 📦 Dependencies to Install

```bash
npm install --save \
  binance-api-node \
  technicalindicators \
  dayjs \
  recharts \
  @types/node
```

**Package Purposes:**
- `binance-api-node`: Official Binance API SDK
- `technicalindicators`: TA-Lib alternative (Keltner, Bollinger, MACD, etc.)
- `dayjs`: Date handling for candlestick data
- `recharts`: Already installed - for profit charts
- `@types/node`: TypeScript types

---

## 🏗️ Architecture Plan

### Directory Structure

```
src/
├── lib/
│   └── trading/
│       ├── types.ts                    # Trading data types
│       ├── indicators/
│       │   ├── keltner.ts             # Keltner Channel
│       │   ├── bollinger.ts           # Bollinger Bands
│       │   ├── macd.ts                # MACD
│       │   ├── cci.ts                 # CCI
│       │   └── supertrend.ts          # SuperTrend
│       ├── strategies/
│       │   └── xauusd-strategy.ts     # XAUUSD hybrid strategy
│       ├── backtest/
│       │   ├── engine.ts              # Backtest engine
│       │   └── risk-manager.ts        # Risk management
│       └── connectors/
│           └── binance.ts             # Binance API connector
│
├── app/
│   └── (portal)/
│       └── dashboard/
│           ├── page.tsx               # Main dashboard
│           └── components/
│               ├── BacktestPanel.tsx  # Backtest controls
│               ├── LiveTradePanel.tsx # Live trading controls
│               ├── ProfitChart.tsx    # P&L visualization
│               └── StrategyConfig.tsx # Strategy parameters
│
└── app/api/
    └── trading/
        ├── backtest/route.ts          # POST /api/trading/backtest
        ├── live/route.ts              # POST /api/trading/live
        └── positions/route.ts         # GET /api/trading/positions
```

---

## 🔢 Technical Indicators to Implement

### 1. Keltner Channel
```typescript
interface KeltnerChannelConfig {
  maPeriod: number;      // 15
  atrPeriod: number;     // 10
  atrMultiple: number;   // 0.5
}
```

### 2. Bollinger Bands
```typescript
interface BollingerBandsConfig {
  period: number;        // 15
  deviation: number;     // 1.0
}
```

### 3. MACD
```typescript
interface MACDConfig {
  fastPeriod: number;    // 12
  slowPeriod: number;    // 26
  signalPeriod: number;  // 9
}
```

### 4. CCI (Commodity Channel Index)
```typescript
interface CCIConfig {
  period: number;        // 20
}
```

### 5. SuperTrend
```typescript
interface SuperTrendConfig {
  period: number;        // 10
  multiplier: number;    // 3.0
}
```

---

## 🎲 Strategy Logic to Port

### From `fastq/src/strategy/hybrid_optimized_strategy.py`

**Entry Conditions (LONG):**
1. Price > Keltner Upper AND Price > Bollinger Upper
2. MACD > Signal (golden cross)
3. CCI > 50
4. 5-min MACD > Signal (trend confirmation)
5. 5-min CCI > 0

**Exit Conditions:**
1. News event detected (1 min before)
2. Trailing stop triggered
3. Hard stop loss hit (1.5x ATR)
4. Take profit levels: 1.5R, 2.5R, 4.0R
5. Daily max loss: $1,000
6. Max drawdown: 25%

**Risk Management:**
- Position size: 0.3 lots for XAUUSD
- Stop loss: 1.5x ATR (mandatory)
- Trailing activation: 0.8R profit
- Trailing distance: 1.0x ATR

---

## 🔌 Binance API Integration

### API Endpoints Needed

1. **Get Candlestick Data**
   ```typescript
   client.futuresCandles({
     symbol: 'XAUUSDT',
     interval: '1m',
     limit: 500
   })
   ```

2. **Place Market Order**
   ```typescript
   client.futuresOrder({
     symbol: 'XAUUSDT',
     side: 'BUY',
     type: 'MARKET',
     quantity: 0.3
   })
   ```

3. **Set Stop Loss**
   ```typescript
   client.futuresOrder({
     symbol: 'XAUUSDT',
     side: 'SELL',
     type: 'STOP_MARKET',
     stopPrice: calculateStopPrice(),
     quantity: 0.3
   })
   ```

4. **Get Current Position**
   ```typescript
   client.futuresPositionRisk({
     symbol: 'XAUUSDT'
   })
   ```

### API Key Setup
- Create `.env.local` file
- Add `BINANCE_API_KEY` and `BINANCE_API_SECRET`
- Use testnet for initial testing

---

## 🎨 Dashboard UI Components

### 1. Backtest Panel
- Date range selector
- Strategy level selector (1, 2, 3)
- Run backtest button
- Results display:
  - Profit factor
  - Win rate
  - Total trades
  - 7-day return
  - Equity curve chart

### 2. Live Trade Panel
- Start/Stop trading buttons
- Current position display
- Real-time P&L
- Today's trades count
- Risk limits status

### 3. Strategy Config
- Editable parameters:
  - Keltner settings
  - Bollinger settings
  - MACD settings
  - Risk limits
- Save/Load configurations

### 4. Profit Chart
- Equity curve over time
- Trade markers (green=win, red=loss)
- Drawdown visualization
- Statistics panel

---

## 🧪 Testing Plan

### 1. Unit Tests
- Test each indicator independently
- Compare results with Python implementation
- Verify calculation accuracy

### 2. Backtest Tests
- Run 7-day backtest on historical data
- Compare results with Python version
- Target metrics:
  - Profit factor: ~1.77
  - Win rate: ~64.9%
  - Trades/day: ~8.1

### 3. Integration Tests
- Test Binance API connection (testnet)
- Test order placement (testnet)
- Test position management

### 4. Risk Management Tests
- Verify stop loss triggers
- Verify daily max loss cutoff
- Verify max drawdown protection

---

## 📊 Data Flow

```
1. User clicks "Run Backtest"
   ↓
2. Frontend sends request to /api/trading/backtest
   ↓
3. Backend fetches historical data from Binance
   ↓
4. Backtest engine processes data:
   - Calculate indicators
   - Generate signals
   - Simulate trades
   - Apply risk management
   ↓
5. Return results to frontend
   ↓
6. Display equity curve and statistics
```

---

## ⚠️ Important Notes

### Binance Futures Trading
- XAUUSD is traded as `XAUUSDT` on Binance Futures
- Use **USDT-margined futures** (not spot)
- Testnet available at: `testnet.binancefuture.com`

### Risk Warnings
- Start with **testnet only**
- Never use real funds until fully tested
- Implement kill switch for emergency stop
- Log all trades for audit trail

### Python Strategy Compatibility
- Keep original Python code in `/fastq` as reference
- Ensure TypeScript version produces similar results
- Document any deviations from original strategy

---

## 🚀 Phase 2 Deliverables

By the end of Phase 2, you will have:

1. ✅ Fully functional TypeScript trading strategy
2. ✅ Working backtest engine with historical results
3. ✅ Binance API integration (testnet)
4. ✅ Interactive trading dashboard
5. ✅ Real-time profit/loss visualization
6. ✅ Risk management system
7. ✅ API endpoints for trading operations

---

## 📅 Next Session

When ready for Phase 2, I will:

1. Install required npm packages
2. Create TypeScript type definitions
3. Port all indicators to TypeScript
4. Implement XAUUSD strategy
5. Build backtest engine
6. Create Binance connector
7. Build dashboard UI
8. Add charts and visualizations
9. Test everything thoroughly

**Ready to proceed? Just say "Start Phase 2" when you're ready!**
