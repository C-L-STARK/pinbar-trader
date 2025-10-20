import { BollingerBands } from 'technicalindicators';
import type { Candle, BollingerBandsResult } from '../types';

export interface BollingerBandsConfig {
  period: number; // Default: 15
  deviation: number; // Default: 1.0 (standard deviations)
}

/**
 * Calculate Bollinger Bands
 *
 * Bollinger Bands consist of:
 * - Middle line: SMA of close prices
 * - Upper band: Middle + (Standard Deviation * multiplier)
 * - Lower band: Middle - (Standard Deviation * multiplier)
 *
 * @param candles - Array of candlestick data
 * @param config - Bollinger Bands configuration
 * @returns Array of Bollinger Bands values
 */
export function calculateBollingerBands(
  candles: Candle[],
  config: BollingerBandsConfig
): BollingerBandsResult[] {
  const { period, deviation } = config;

  if (candles.length < period) {
    throw new Error(`Insufficient data: need at least ${period} candles`);
  }

  // Extract close prices
  const closePrices = candles.map(c => c.close);

  // Calculate Bollinger Bands using technicalindicators library
  const bbValues = BollingerBands.calculate({
    period: period,
    values: closePrices,
    stdDev: deviation,
  });

  // Convert to our interface format
  const results: BollingerBandsResult[] = bbValues.map(bb => ({
    upper: bb.upper,
    middle: bb.middle,
    lower: bb.lower,
  }));

  return results;
}

/**
 * Get the latest Bollinger Bands value
 */
export function getLatestBollingerBands(
  candles: Candle[],
  config: BollingerBandsConfig
): BollingerBandsResult | null {
  const results = calculateBollingerBands(candles, config);
  return results.length > 0 ? results[results.length - 1] : null;
}
