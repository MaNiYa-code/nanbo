import { ADVICE_RULES } from '../../data/adviceData';

const typeConfig = {
  warning: { bg: '#FFF0EE', border: '#FFCDC8', title: '#70191D', msg: '#8B3030', act: '#970A12' },
  tip:     { bg: '#FFF8EC', border: '#FECD6D88', title: '#6B3A00', msg: '#8B5820', act: '#D1601F' },
  info:    { bg: '#EEF3FA', border: '#5686BB44', title: '#1A3A5C', msg: '#3A5A7C', act: '#5686BB' },
  success: { bg: '#F0FAF4', border: '#4CAF7044', title: '#1A4A28', msg: '#2E6B42', act: '#2E9950' },
};

export function AdvicePanel({ assets, categoryRatios, riskScore, totalAmount, limit }) {
  const matched = ADVICE_RULES
    .filter(rule => rule.condition({ ratios: categoryRatios, riskScore, totalAmount, assets }))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit || 99);

  if (matched.length === 0) {
    return (
      <div className="text-center py-6">
        <span className="text-3xl">🎉</span>
        <p className="text-sm font-semibold mt-2" style={{ color: '#8B5840' }}>ポートフォリオは良好です！</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matched.map((advice, i) => {
        const s = typeConfig[advice.type] || typeConfig.info;
        return (
          <div
            key={advice.id}
            className="rounded-2xl p-4 fade-up"
            style={{ background: s.bg, border: `1.5px solid ${s.border}`, animationDelay: `${i * 60}ms` }}
          >
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">{advice.emoji}</span>
              <div>
                <p className="font-black text-sm mb-1" style={{ color: s.title }}>{advice.title}</p>
                <p className="text-xs leading-relaxed mb-2" style={{ color: s.msg }}>{advice.message}</p>
                <div className="flex items-center gap-1 text-xs font-bold" style={{ color: s.act }}>
                  <span>→</span>
                  <span>{advice.action}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
