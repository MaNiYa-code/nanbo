import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ASSET_CATEGORIES } from '../../utils/constants';
import { formatCurrency, formatPercent, formatShort } from '../../utils/formatters';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0];
    return (
      <div className="rounded-2xl shadow-xl p-3 text-sm"
        style={{ background: '#fff', border: '1.5px solid #EDD5C0' }}>
        <p className="font-black" style={{ color: '#70191D' }}>{d.name}</p>
        <p className="font-bold" style={{ color: '#D1601F' }}>{formatCurrency(d.value)}</p>
        <p className="text-xs" style={{ color: '#B07050' }}>{formatPercent(d.payload.ratio)}</p>
      </div>
    );
  }
  return null;
};

export function AllocationPieChart({ categoryTotals, totalAmount }) {
  const data = Object.entries(ASSET_CATEGORIES)
    .filter(([key]) => (categoryTotals[key] || 0) > 0)
    .map(([key, cat]) => ({
      name: cat.icon + ' ' + cat.label,
      value: categoryTotals[key],
      ratio: totalAmount > 0 ? categoryTotals[key] / totalAmount : 0,
      color: cat.color,
    }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48" style={{ color: '#B07050' }}>
        <span className="text-4xl mb-2">📭</span>
        <p className="text-sm font-medium">資産を登録するとグラフが表示されます</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Donut + center label */}
      <div className="relative w-full" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={65}
              outerRadius={92}
              paddingAngle={2.5}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#B07050' }}>TOTAL</p>
          <p className="text-xl font-black" style={{ color: '#70191D' }}>{formatShort(totalAmount)}</p>
        </div>
      </div>

      {/* Legend grid */}
      <div className="w-full grid grid-cols-2 gap-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: d.color + '12', border: `1px solid ${d.color}25` }}>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <span className="text-xs font-semibold truncate flex-1" style={{ color: '#2C1008' }}>{d.name}</span>
            <span className="text-xs font-black" style={{ color: d.color }}>{formatPercent(d.ratio)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
