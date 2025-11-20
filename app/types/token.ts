export interface TokenInfo {
  baseDecimals: number;
  baseName: string;
  baseSupply: number;
  baseSymbol: string;
  baseToken: string;
  buyCount24h: number;
  chainId: string;
  count24h: number;
  dex: string;
  info: string,
  // info: {
  //   twitter?: string;
  //   website?: string;
  //   telegram?: string;
  // };
  liquidity: number;
  marketCap: number;
  pair: string;
  price: number;
  priceChange1h: number;
  priceChange1m: number;
  priceChange24h: number;
  priceChange5m: number;
  priceNative: number;
  priceUsd: number;
  quoteName: string;
  quoteSymbol: string;
  quoteToken: string;
  sellCount24h: number;
  timeDiff: string;
  volumeUsd24h: number;
}

export interface TrendingTokensTableProps {
  tokens: TokenInfo[];
}

export interface WebSocketMessage {
  topic: string;
  event?: string;
  interval?: string;
  pair?: string;
  chainId?: string;
  compression?: number;
  data?: TokenInfo[];
  pong?: string;
  code?: string;
  msg?: string;
  t?: number;
}

// 表头
export interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
  type: string
}

// 表头排序
export interface sortConfig  { 
  key: string; 
  direction: 'asc' | 'desc' 
}