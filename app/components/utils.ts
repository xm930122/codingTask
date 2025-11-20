import { mul, divide, ToPrecision } from '../utils/base';

// 格式化函数
export const formatNumber = (num: number, pos = 2): string => {
  if (num >= 1000000000) return `${ToPrecision(divide(num, 1000000000), pos)}B`;
  if (num >= 1000000) return `${(ToPrecision(divide(num, 1000000)), pos)}M`;
  if (num >= 1000) return `${(ToPrecision(divide(num, 1000)), pos)}K`;
  return `${ToPrecision(num, pos)}`;
};

// 百分比
export const formatPercentage = (num: number, pos = 2): string => {
  return `${ToPrecision(mul(num, 100), pos)}%`;
};

export const getPriceChangeColor = (change: number): string => {
  if (change > 0) return "text-upside";
  return "text-downside";
};
