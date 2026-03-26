import { AdvicePanel } from '../components/advice/AdvicePanel';
import { BASIC_KNOWLEDGE } from '../data/adviceData';

function Card({ label, children }) {
  return (
    <div className="rounded-3xl p-5 shadow-sm" style={{ background: '#FFFFFF', border: '1.5px solid #EDD5C0' }}>
      {label && (
        <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-4" style={{ color: '#B07050' }}>
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

function SliderRow({ label, value, display, min, max, step, onChange, minLabel, maxLabel }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold" style={{ color: '#2C1008' }}>{label}</label>
        <span className="text-xs font-black px-2.5 py-1 rounded-xl" style={{ background: '#FECD6D33', color: '#70191D' }}>
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={onChange}
        className="w-full"
        style={{ accentColor: '#D1601F' }}
      />
      <div className="flex justify-between text-[10px] font-semibold mt-1" style={{ color: '#C4A090' }}>
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function AdvicePage({ assets, categoryRatios, riskScore, totalAmount, settings, onUpdateSettings }) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - (settings.birthYear || 2001);

  return (
    <div className="space-y-4 fade-up">
      <div>
        <h2 className="text-xl font-black" style={{ color: '#70191D' }}>アドバイス</h2>
        <p className="text-xs font-medium" style={{ color: '#B07050' }}>あなたに合わせたお金の育て方</p>
      </div>

      {/* Settings */}
      <Card label="あなたの情報">
        <div className="space-y-5">
          <SliderRow
            label="生まれ年"
            value={settings.birthYear}
            display={`${settings.birthYear}年 (${age}歳)`}
            min={1990} max={2005}
            onChange={e => onUpdateSettings({ birthYear: Number(e.target.value) })}
            minLabel="1990" maxLabel="2005"
          />
          <SliderRow
            label="月収（目安）"
            value={settings.monthlyIncome}
            display={`${(settings.monthlyIncome / 10000).toFixed(0)}万円`}
            min={150000} max={1000000} step={50000}
            onChange={e => onUpdateSettings({ monthlyIncome: Number(e.target.value) })}
            minLabel="15万" maxLabel="100万"
          />
          {/* Tip banner */}
          <div className="flex items-start gap-2.5 px-3 py-3 rounded-2xl"
            style={{ background: '#FECD6D22', border: '1.5px solid #FECD6D88' }}>
            <span className="text-lg flex-shrink-0">💡</span>
            <p className="text-xs font-semibold" style={{ color: '#6B3A00' }}>
              毎月の積立目安：月収の
              <span className="font-black" style={{ color: '#D1601F' }}> {age < 25 ? '10〜20' : '15〜25'}%</span>
              （<span className="font-black">{((settings.monthlyIncome * (age < 25 ? 0.15 : 0.20)) / 10000).toFixed(1)}万円</span>〜）が目安です
            </p>
          </div>
        </div>
      </Card>

      {/* Personalized advice */}
      <Card label="パーソナライズアドバイス">
        <AdvicePanel
          assets={assets}
          categoryRatios={categoryRatios}
          riskScore={riskScore}
          totalAmount={totalAmount}
        />
      </Card>

      {/* Basic knowledge */}
      <Card label="20代の投資基礎知識">
        <div className="space-y-2.5">
          {BASIC_KNOWLEDGE.map(item => (
            <details key={item.id} className="group">
              <summary
                className="flex items-center gap-2.5 cursor-pointer py-2.5 px-3 rounded-xl transition-all"
                style={{ background: '#FFF8F0', border: '1.5px solid #EDD5C0' }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-bold flex-1" style={{ color: '#2C1008' }}>{item.title}</span>
                <span className="text-xs font-bold transition-transform group-open:rotate-180 inline-block" style={{ color: '#C4A090' }}>▾</span>
              </summary>
              <div className="px-3 pt-2.5 pb-1">
                <p className="text-xs leading-relaxed" style={{ color: '#8B5840' }}>{item.content}</p>
              </div>
            </details>
          ))}
        </div>
      </Card>
    </div>
  );
}
