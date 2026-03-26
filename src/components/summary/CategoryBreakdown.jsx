import { ASSET_CATEGORIES } from '../../utils/constants';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function CategoryBreakdown({ categoryTotals, categoryRatios }) {
  const entries = Object.entries(ASSET_CATEGORIES)
    .filter(([key]) => (categoryTotals[key] || 0) > 0)
    .sort(([a], [b]) => (categoryTotals[b] || 0) - (categoryTotals[a] || 0));

  if (entries.length === 0) return null;

  return (
    <div className="space-y-3">
      {entries.map(([key, cat]) => {
        const ratio = categoryRatios[key] || 0;
        const amount = categoryTotals[key] || 0;
        return (
          <div key={key}>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-sm"
                style={{ background: cat.color + '20', border: `1px solid ${cat.color}30` }}>
                {cat.icon}
              </div>
              <span className="text-sm font-bold flex-1" style={{ color: '#2C1008' }}>{cat.label}</span>
              <span className="text-sm font-black" style={{ color: '#70191D' }}>{formatCurrency(amount)}</span>
              <span className="text-xs font-bold w-11 text-right" style={{ color: cat.color }}>{formatPercent(ratio)}</span>
            </div>
            <div className="ml-10 h-2 rounded-full overflow-hidden" style={{ background: '#EDD5C0' }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${ratio * 100}%`, background: cat.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
