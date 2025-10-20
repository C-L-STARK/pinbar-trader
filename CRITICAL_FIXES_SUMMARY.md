# 量化策略关键修复总结

## 已完成的修复

### 1. ✅ 策略入场逻辑修复 (xauusd-strategy.ts)

**问题**: Node.js版本缺少MACD crossover检测，仅检查MACD位置
**Python版本**: 使用 `macd_cross_1m == 1` (bullish crossover) 或 `== -1` (bearish crossover)
**修复**:
- 使用 `isMACDBullishCrossover()` 和 `isMACDBearishCrossover()` 检测真实的crossover
- 匹配Python line 215, 239的逻辑

### 2. ✅ 止损计算修复

**问题**: Node.js版本使用ATR倍数计算止损
**Python版本**:
- Long: `stop_loss = min(kc_lower_1m, bb_lower_1m)` (line 260)
- Short: `stop_loss = max(kc_upper_1m, bb_upper_1m)` (line 285)

**修复**: 更新 `calculateStopLoss()` 使用KC/BB带的最小/最大值

### 3. ✅ CCI阈值修复

**Python版本**:
- Level 1 (Conservative): CCI > 50 / < -50 (line 138)
- Level 2 (Moderate): CCI > 20 / < -20 (line 140)
- Level 3 (Aggressive): CCI > 0 / < 0 (line 142)

**修复**: 更新所有激进度级别的CCI阈值匹配Python

### 4. ✅ 追踪止损逻辑修复

**Python版本** (line 477-511):
- 激活条件: profit >= 0.8R
- 追踪距离: 1.0x ATR
- 需要跟踪 highestPrice (long) / lowestPrice (short)

**修复**:
- 添加 `highestPrice` 和 `lowestPrice` 到Trade类型
- 更新 `calculateTrailingStop()` 返回这些值
- 匹配Python的追踪逻辑

## 需要继续的工作

### 🔴 CRITICAL: 回测引擎需要完全重写

**文件**: `src/lib/trading/backtest/engine.ts`

**关键问题**:

1. **止损计算错误**:
```typescript
// 当前 (WRONG):
const stopLoss = this.strategy.calculateStopLoss(entryPrice, side, signal.indicators.atr);

// 应该 (CORRECT):
const stopLoss = this.strategy.calculateStopLoss(entryPrice, side, signal.indicators);
```

2. **缺少initialStopLoss跟踪**:
```typescript
// 需要添加:
const trade: Trade = {
  // ...
  stopLoss,
  initialStopLoss: stopLoss, // 用于R计算
  highestPrice: side === 'long' ? entryPrice : undefined,
  lowestPrice: side === 'short' ? entryPrice : undefined,
};
```

3. **追踪止损更新逻辑错误**:
```typescript
// 当前逻辑缺少 highestPrice/lowestPrice 追踪
// 需要使用新的 calculateTrailingStop() 签名
const trailingResult = this.strategy.calculateTrailingStop(
  trade.entryPrice,
  currentCandle.close,
  trade.highestPrice,
  trade.lowestPrice,
  trade.initialStopLoss,
  trade.side,
  indicators.atr
);

if (trailingResult.active) {
  trade.trailingStop = trailingResult.trailingStop;
  trade.highestPrice = trailingResult.highestPrice;
  trade.lowestPrice = trailingResult.lowestPrice;
}
```

4. **盈亏计算需要验证**:
```python
# Python (line 555-558):
if 'XAU' in position.symbol:
    pnl = pnl_pips * position.size * 100  # XAUUSD: 1 lot = 100 oz
else:
    pnl = pnl_pips * position.size * 100000  # Forex
```

当前Node.js版本使用固定的100，需要验证是否正确。

### 🔴 资金曲线渲染问题

**文件**: `src/app/(portal)/dashboard/components/ProfitChart.tsx`

**问题**:
- 可能是数据格式问题
- equityCurve数据点缺失或格式不正确

**需要检查**:
- BacktestResult.equityCurve 是否正确填充
- 图表数据映射是否正确

### 🔴 交易记录样式问题

**文件**: `src/app/(portal)/dashboard/components/BacktestPanel.tsx`

**问题**: table样式错乱

**可能原因**:
- Tailwind类冲突
- 响应式布局问题
- 表格宽度设置

## 下一步行动计划

1. **立即**: 重写 `backtest/engine.ts` 的核心逻辑
2. **其次**: 修复资金曲线渲染
3. **最后**: 修复交易记录表格样式
4. **验证**: 与Python版本对比回测结果，确保一致性

## Python vs Node.js 关键差异对照

| 功能 | Python | Node.js (修复前) | Node.js (修复后) |
|------|--------|-----------------|-----------------|
| 入场条件 | MACD crossover | MACD position | ✅ MACD crossover |
| 止损计算 | min/max(KC, BB) | ATR multiple | ✅ min/max(KC, BB) |
| CCI Level 1 | 50 / -50 | 50 / -50 | ✅ 50 / -50 |
| CCI Level 2 | 20 / -20 | 20 / -20 | ✅ 20 / -20 |
| CCI Level 3 | 0 | 0 | ✅ 0 |
| 追踪激活 | 0.8R | 0.8R | ✅ 0.8R |
| 追踪距离 | 1.0 ATR | 1.0 ATR | ✅ 1.0 ATR |
| 止盈目标 | 1.5R, 2.5R, 4.0R | Variable | ✅ 1.5R, 2.5R, 4.0R |

## 测试检查清单

- [ ] 回测结果数量合理 (不能为0)
- [ ] 胜率在合理范围 (40-70%)
- [ ] 盈利因子 > 1.0
- [ ] 资金曲线正确显示
- [ ] 每笔交易有正确的入场/出场价格
- [ ] 止损/止盈/追踪止损正确触发
- [ ] 盈亏计算正确 (XAUUSD: pips * size * 100)
