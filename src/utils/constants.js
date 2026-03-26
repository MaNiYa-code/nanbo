// ─── Brand Palette ────────────────────────────────────────────────
// Burgundy #70191D | Chinese Red #970A12 | Satsuma #D1601F
// Lunar Yellow #FECD6D | Cobalt #5686BB

export const ASSET_CATEGORIES = {
  bank_account: { id: 'bank_account', label: '銀行口座',  color: '#5686BB', icon: '🏦', riskWeight: 0,  group: 'safe'   },
  cash:         { id: 'cash',         label: '手元現金',  color: '#D1601F', icon: '💴', riskWeight: 0,  group: 'safe'   },
  nisa:         { id: 'nisa',         label: 'NISA',      color: '#970A12', icon: '🌱', riskWeight: 35, group: 'invest' },
  mutual_fund:  { id: 'mutual_fund',  label: '投資信託',  color: '#70191D', icon: '📊', riskWeight: 40, group: 'invest' },
  jp_stock:     { id: 'jp_stock',     label: '日本株',    color: '#970A12', icon: '🇯🇵', riskWeight: 70, group: 'invest' },
  us_stock:     { id: 'us_stock',     label: '米国株',    color: '#5686BB', icon: '🇺🇸', riskWeight: 65, group: 'invest' },
  gold:         { id: 'gold',         label: '純金積立',  color: '#C8A93A', icon: '🥇', riskWeight: 20, group: 'invest' },
  crypto:       { id: 'crypto',       label: '暗号通貨',  color: '#D1601F', icon: '₿',  riskWeight: 95, group: 'invest' },
  bond:         { id: 'bond',         label: '債券',      color: '#7A9CB8', icon: '📄', riskWeight: 15, group: 'invest' },
  other:        { id: 'other',        label: 'その他',    color: '#A0522D', icon: '💎', riskWeight: 30, group: 'other'  },
};

export const RISK_LEVELS = [
  { min: 0,   max: 20,  label: '超安定型',       color: '#5686BB', desc: 'リスク最小・堅実な守りの運用' },
  { min: 20,  max: 40,  label: '安定型',          color: '#7A9CB8', desc: '安定重視でじっくり育てる' },
  { min: 40,  max: 60,  label: 'バランス型',      color: '#FECD6D', desc: '安定と成長のいいとこどり' },
  { min: 60,  max: 80,  label: '成長型',          color: '#D1601F', desc: '積極的に攻めていくスタイル' },
  { min: 80,  max: 101, label: 'アグレッシブ型',  color: '#970A12', desc: 'ハイリスク・ハイリターン狙い' },
];

export const QUICK_ADD_PRESETS = [
  { label: '銀行口座',  category: 'bank_account', emoji: '🏦' },
  { label: 'NISA',      category: 'nisa',          emoji: '🌱' },
  { label: '投資信託',  category: 'mutual_fund',   emoji: '📊' },
  { label: '純金積立',  category: 'gold',          emoji: '🥇' },
  { label: '米国株',    category: 'us_stock',      emoji: '🇺🇸' },
  { label: '暗号通貨',  category: 'crypto',        emoji: '₿'  },
];

export const SAMPLE_ASSETS = [
  { id: '1', name: '楽天銀行',               category: 'bank_account', amount: 300000, note: 'メイン生活口座' },
  { id: '2', name: 'ゆうちょ銀行',           category: 'bank_account', amount: 150000, note: '貯蓄用' },
  { id: '3', name: 'eMAXIS Slim 全世界株式', category: 'nisa',         amount: 480000, note: 'つみたてNISA' },
  { id: '4', name: 'S&P500 ETF (VOO)',       category: 'us_stock',     amount: 320000, note: '' },
  { id: '5', name: 'トヨタ自動車',           category: 'jp_stock',     amount: 180000, note: '' },
  { id: '6', name: '純金積立 (田中貴金属)',   category: 'gold',         amount: 120000, note: '毎月1万円' },
  { id: '7', name: 'ビットコイン',           category: 'crypto',       amount: 80000,  note: '' },
];
