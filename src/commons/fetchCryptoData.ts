// utils/fetchData.ts
interface CoinGeckoData {
  symbol: string;
}

interface BinanceSymbol {
  baseAsset: string;
  quoteAsset: string;
}

export async function fetchTopCryptos(): Promise<string[]> {
  const apiUrl = '/coin';  // 本地 API 路由
  const binanceUrl = 'https://api.binance.com/api/v3/exchangeInfo';

  const [coingeckoData, binanceData] = await Promise.all([
    fetch(apiUrl).then((res) => res.json() as Promise<CoinGeckoData[]>),
    fetch(binanceUrl).then((res) => res.json() as Promise<{ symbols: BinanceSymbol[] }>),
  ]);

  const usdtPairs = binanceData.symbols
  .filter((symbol) => symbol.quoteAsset === 'USDT')
  .map((symbol) => symbol.baseAsset);

  const topCryptos = coingeckoData
  .map((crypto) => crypto.symbol.toUpperCase())
  .filter((symbol) => usdtPairs.includes(symbol))
  .slice(0, 20);

  return topCryptos;
}

// utils/websocket.ts
let socket: WebSocket | null = null;

interface WebSocketMessage {
  stream: string;
  data: Record<string, string>;
}

export function connectWebSocket(
  symbols: string[],
  setCryptoData: React.Dispatch<React.SetStateAction<Record<string, any>>>
) {
  const streams = symbols.map((symbol) => `${symbol.toLowerCase()}usdt@ticker`).join('/');
  const url = `wss://stream.binance.com:9443/stream?streams=${streams}`;

  socket = new WebSocket(url);

  socket.onmessage = (event: MessageEvent) => {
    const message: WebSocketMessage = JSON.parse(event.data);
    const { stream, data } = message;
    const symbol = stream.split('@')[0].toUpperCase().replace('USDT', '');

    setCryptoData((prev) => ({ ...prev, [symbol]: data }));
  };
}

export function disconnectWebSocket() {
  if (socket) socket.close();
}