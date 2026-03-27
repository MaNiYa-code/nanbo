import { formatCurrency } from '../../utils/formatters';

function Row({ label, value, sub, highlight, minus }) {
  return (
    <div className="flex items-center justify-between py-2.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="flex items-center gap-2">
        {minus && <span className="text-sm font-black opacity-60">−</span>}
        <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</span>
      </div>
      <div className="text-right">
        <span className={`font-black text-base ${highlight ? 'text-white' : ''}`}
          style={highlight ? { color: '#FECD6D' } : { color: 'rgba(255,255,255,0.9)' }}>
          {value}
        </span>
        {sub && <span className="block text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{sub}</span>}
      </div>
    </div>
  );
}

export function NanboCard({ nanboAmount, nanboPerDay, nanboPerWeek, settings, onEdit }) {
  const isNegative  = nanboAmount < 0;
  const isWarning   = nanboAmount >= 0 && nanboAmount < 30000;
  const isHealthy   = nanboAmount >= 30000;

  const bgGradient = isNegative
    ? 'linear-gradient(145deg, #70191D 0%, #970A12 100%)'
    : isWarning
    ? 'linear-gradient(145deg, #B04A10 0%, #D1601F 100%)'
    : 'linear-gradient(145deg, #1A3A5C 0%, #5686BB 100%)';

  const accentColor = isNegative ? '#FECD6D' : isWarning ? '#FECD6D' : '#FECD6D';

  return (
    <div className="halftone-overlay rounded-3xl overflow-hidden shadow-xl" style={{ background: bgGradient }}>

      {/* ── Hero ── */}
      <div className="relative px-6 pt-6 pb-4 text-center">
        {/* ハーフトーン装飾 */}
        <div className="halftone-burst" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(254,205,109,0.12) 2px, transparent 2px)', backgroundSize: '14px 14px' }} />

        <p className="text-xs font-black tracking-[0.25em] uppercase mb-3 relative"
          style={{ color: 'rgba(255,255,255,0.55)' }}>
          今月、なんぼ使える？
        </p>

        {isNegative ? (
          <div className="relative">
            <p className="text-4xl font-black mb-1" style={{ color: '#FECD6D' }}>赤字です 🚨</p>
            <p className="text-lg font-black" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {formatCurrency(Math.abs(nanboAmount))} オーバー
            </p>
          </div>
        ) : (
          <div className="relative">
            <p className="text-[3rem] font-black leading-none mb-1" style={{ color: accentColor }}>
              {formatCurrency(nanboAmount)}
            </p>
            <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {isWarning ? '⚠️ ちょっと少なめ' : '✨ 自由に使えるお金'}
            </p>

            {/* Per day / per week badges */}
            <div className="flex gap-2 justify-center">
              {[
                { label: '1日あたり', value: formatCurrency(nanboPerDay) },
                { label: '1週間あたり', value: formatCurrency(nanboPerWeek) },
              ].map((b, i) => (
                <div key={i} className="flex-1 rounded-2xl px-3 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <p className="text-[10px] font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{b.label}</p>
                  <p className="font-black text-sm" style={{ color: '#FECD6D' }}>{b.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Breakdown ── */}
      <div className="mx-4 mb-4 rounded-2xl px-4"
        style={{ background: 'rgba(0,0,0,0.2)' }}>
        <Row
          label="月収"
          value={formatCurrency(settings.monthlyIncome)}
          sub="税引き後の手取り"
        />
        <Row
          label="固定費"
          value={formatCurrency(settings.monthlyFixedCost)}
          sub="家賃・光熱費・食費など"
          minus
        />
        <Row
          label="毎月の積立"
          value={formatCurrency(settings.monthlyInvestment)}
          sub="投資・貯蓄"
          minus
        />
        <div className="flex items-center justify-between py-3">
          <span className="text-sm font-black text-white">＝ 自由に使える</span>
          <span className="font-black text-lg" style={{ color: isNegative ? '#FF8A80' : '#FECD6D' }}>
            {formatCurrency(nanboAmount)}
          </span>
        </div>
      </div>

      {/* ── Edit button ── */}
      <button
        onClick={onEdit}
        className="w-full py-3.5 text-sm font-black tracking-wide transition-all active:opacity-70"
        style={{
          background: 'rgba(254,205,109,0.15)',
          color: '#FECD6D',
          borderTop: '1px solid rgba(254,205,109,0.2)',
        }}
      >
        収入・固定費を変更する →
      </button>
    </div>
  );
}
