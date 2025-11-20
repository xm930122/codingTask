// 格式化函数
export const formatNumber = (num: number, pos = 2): string => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(pos)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(pos)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(pos)}K`;
  return `${num.toFixed(pos)}`;
};

// 百分比
export const formatPercentage = (num: number, pos = 2): string => {
  // return `${num > 0 ? '+' : ''}${(num * 100).toFixed(2)}%`;
  return `${(num * 100).toFixed(pos)}%`;
};

export const getPriceChangeColor = (change: number): string => {
  if (change > 0) return "text-upside";
  return "text-downside";
};
