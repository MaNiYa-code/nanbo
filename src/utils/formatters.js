export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatShort = (amount) => {
  if (amount >= 100000000) return `¥${(amount / 100000000).toFixed(1)}億`;
  if (amount >= 10000)     return `¥${(amount / 10000).toFixed(0)}万`;
  return `¥${amount.toLocaleString('ja-JP')}`;
};

export const formatPercent = (ratio) => {
  return `${(ratio * 100).toFixed(1)}%`;
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('ja-JP').format(num);
};
