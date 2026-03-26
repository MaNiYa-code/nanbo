import { RISK_LEVELS } from '../../utils/constants';
import { formatCurrency, formatPercent, formatShort } from '../../utils/formatters';

export function TotalSummary({ totalAmount, safeRatio, investRatio, riskScore }) {
  const level = RISK_LEVELS.find(l => riskScore >= l.min && riskScore < l.max) || RISK_LEVELS[RISK_LEVELS.length - 1];

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl"
      style={{ background: 'linear-gradient(145deg, #70191D 0%, #970A12 55%, #B01A14 100%)' }}>

      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-10"
        style={{ background: '#FECD6D' }} />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
        style={{ background: '#D1601F' }} />
      <div className="absolute top-1/2 right-6 w-16 h-16 rounded-full opacity-5"
        style={{ background: '#FECD6D' }} />

      <div className="relative">
        {/* Label */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#FECD6D99' }}>Total Assets</p>
          <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: level.color + '33', color: level.color, border: `1px solid ${level.color}55` }}>
            {level.label}
          </span>
        </div>

        {/* Big number */}
        <p className="text-[2.6rem] font-black tracking-tight leading-none mb-1"
          style={{ color: '#FECD6D' }}>
          {formatCurrency(totalAmount)}
        </p>
        <p className="text-xs mb-5 opacity-50">この端末にローカル保存中</p>

        {/* 3 stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '💰 現金・預金', value: formatShort(Math.round(totalAmount * safeRatio)),   sub: formatPercent(safeRatio)   },
            { label: '📈 投資資産',   value: formatShort(Math.round(totalAmount * investRatio)), sub: formatPercent(investRatio) },
            { label: '⚡ リスク',    value: String(riskScore),                                   sub: 'スコア / 100'             },
          ].map((s, i) => (
            <div key={i} className="glass-dark rounded-2xl p-3">
              <p className="text-[10px] font-semibold mb-1 opacity-60">{s.label}</p>
              <p className="font-black text-base leading-none" style={{ color: '#FECD6D' }}>{s.value}</p>
              <p className="text-[10px] mt-0.5 opacity-50">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
