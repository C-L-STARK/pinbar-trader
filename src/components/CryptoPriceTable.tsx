'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface CryptoPair {
  pair: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  lastUpdate: number;
}

const CRYPTO_PAIRS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT', 'XRPUSDT'];
const WS_URL = 'wss://stream.binance.com:9443/ws';

export default function CryptoPriceTable() {
  const [cryptoData, setCryptoData] = useState<Map<string, CryptoPair>>(new Map());
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      try {
        setConnectionStatus('connecting');
        const websocket = new WebSocket(WS_URL);

        websocket.onopen = () => {
          console.log('WebSocket 连接已建立');
          setConnectionStatus('connected');
          
          // 订阅所有交易对的 ticker 数据
          const subscribeMsg = {
            method: 'SUBSCRIBE',
            params: CRYPTO_PAIRS.map(pair => `${pair.toLowerCase()}@ticker`),
            id: 1
          };
          websocket.send(JSON.stringify(subscribeMsg));
        };

        websocket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            // 处理订阅确认消息
            if (data.result !== undefined) {
              console.log('订阅确认:', data);
              return;
            }
            
            // 处理 ticker 数据
            if (data.e === '24hrTicker') {
              const pair = data.s;
              const currentPrice = parseFloat(data.c);
              const volume = parseFloat(data.v);
              const high = parseFloat(data.h);
              const low = parseFloat(data.l);
              const priceChange = parseFloat(data.p);
              const priceChangePercent = parseFloat(data.P);

              if (isSubscribed) {
                setCryptoData(prev => {
                  const newData = new Map(prev);
                  newData.set(pair, {
                    pair,
                    currentPrice,
                    change: priceChange,
                    changePercent: priceChangePercent,
                    volume,
                    high,
                    low,
                    lastUpdate: Date.now()
                  });
                  return newData;
                });
              }
            }
          } catch (error) {
            console.error('处理消息时出错:', error);
          }
        };

        websocket.onerror = (error) => {
          console.error('WebSocket 错误:', error);
          setConnectionStatus('disconnected');
        };

        websocket.onclose = () => {
          console.log('WebSocket 连接已关闭');
          setConnectionStatus('disconnected');
          
          // 5秒后重连
          if (isSubscribed) {
            reconnectTimeout = setTimeout(connectWebSocket, 5000);
          }
        };

        setWs(websocket);
      } catch (error) {
        console.error('WebSocket 连接错误:', error);
        setConnectionStatus('disconnected');
        
        // 5秒后重连
        if (isSubscribed) {
          reconnectTimeout = setTimeout(connectWebSocket, 5000);
        }
      }
    };

    connectWebSocket();

    return () => {
      isSubscribed = false;
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(2)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(2)}K`;
    }
    return volume.toFixed(2);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const cryptoArray = Array.from(cryptoData.values()).sort((a, b) => b.volume - a.volume);

  return (
    <Card className="w-full card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold gradient-text">实时数字货币价格</CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
              className={connectionStatus === 'connected' ? 'badge-success' : 'badge-error'}
            >
              {connectionStatus === 'connected' && <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />}
              {connectionStatus === 'connecting' ? '连接中...' : 
               connectionStatus === 'connected' ? '已连接' : '未连接'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {cryptoArray.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {connectionStatus === 'connected' ? '等待数据...' : '正在连接到数据源...'}
          </div>
        ) : (
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow className="table-header">
                  <TableHead>交易对</TableHead>
                  <TableHead className="text-right">当前价格</TableHead>
                  <TableHead className="text-right">涨跌</TableHead>
                  <TableHead className="text-right">涨跌幅</TableHead>
                  <TableHead className="text-right">成交量</TableHead>
                  <TableHead className="text-right">最高价</TableHead>
                  <TableHead className="text-right">最低价</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cryptoArray.map((crypto) => (
                  <TableRow key={crypto.pair} className="table-row">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {crypto.pair.slice(0, 2)}
                        </div>
                        {crypto.pair}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ${formatPrice(crypto.currentPrice)}
                    </TableCell>
                    <TableCell className={`text-right ${getChangeColor(crypto.change)}`}>
                      <div className="flex items-center justify-end gap-1">
                        {getChangeIcon(crypto.change)}
                        {crypto.change > 0 ? '+' : ''}{formatPrice(crypto.change)}
                      </div>
                    </TableCell>
                    <TableCell className={`text-right ${getChangeColor(crypto.change)}`}>
                      {crypto.change > 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatVolume(crypto.volume)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-green-600">
                      ${formatPrice(crypto.high)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-red-600">
                      ${formatPrice(crypto.low)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}