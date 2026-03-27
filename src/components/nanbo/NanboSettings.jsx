import { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';

const FIXED_COST_PRESETS = [
  { label: '実家住み',   icon: '🏠', value: 50000  },
  { label: '一人暮らし', icon: '🏢', value: 150000 },
  { label: '都市部',    icon: '🏙', value: 200000 },
];

const INVESTMENT_PRESETS = [
  { label: '月1万', value: 10000  },
  { label: '月3万', value: 30000  },
  { label: '月5万', value: 50000  },
  { label: '月10万', value: 100000 },
];

function AmountInput({ label, name, value, onChange, hint }) {
  const numVal = Number(value) || 0;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: '#B07050' }}>
          {label}
        </label>
        <span className="text-sm font-black" style={{ color: '#70191D' }}>
          {value === '' ? '¥ —' : formatCurrency(numVal)}
        </span>
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-sm" style={{ color: '#8B5840' }}>¥</span>
        <input
          type="number"
          inputMode="numeric"
          name={name}
          value={value}
          onChange={onChange}
          min="0"
          step="1000"
          placeholder="0"
          className="w-full rounded-xl pl-8 pr-4 py-3 font-black text-sm focus:outline-none transition-all"
          style={{ background: '#FFF8F0', border: '1.5px solid #EDD5C0', color: '#70191D' }}
          onFocus={e => e.target.style.borderColor = '#D1601F'}
          onBlur={e => e.target.style.borderColor = '#EDD5C0'}
        />
      </div>
      {hint && <p className="text-[10px] mt-1 ml-1" style={{ color: '#C4A090' }}>{hint}</p>}
    </div>
  );
}

export function NanboSettings({ settings, onUpdateSettings, onClose }) {
  // 文字列として保持することでバックスペース等が正常に動く
  const [local, setLocal] = useState({
    monthlyIncome:     String(settings.monthlyIncome     || ''),
    monthlyFixedCost:  String(settings.monthlyFixedCost  || ''),
    monthlyInvestment: String(settings.monthlyInvestment || ''),
  });

  const handleChange = (e) => {
    setLocal(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setPreset = (name, value) => {
    setLocal(prev => ({ ...prev, [name]: String(value) }));
  };

  const handleSave = () => {
    onUpdateSettings({
      monthlyIncome:     Math.max(0, Number(local.monthlyIncome)     || 0),
      monthlyFixedCost:  Math.max(0, Number(local.monthlyFixedCost)  || 0),
      monthlyInvestment: Math.max(0, Number(local.monthlyInvestment) || 0),
    });
    onClose();
  };

  const income     = Number(local.monthlyIncome)     || 0;
  const fixed      = Number(local.monthlyFixedCost)  || 0;
  const investment = Number(local.monthlyInvestment) || 0;
  const free       = income - fixed - investment;
  const isNegative = free < 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(44,16,8,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-t-3xl shadow-2xl scale-in"
        style={{ background: '#FDF4EC' }}>
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 rounded-full" style={{ background: '#EDD5C0' }} />
        </div>

        <div className="px-5 pb-8 overflow-y-auto" style={{ maxHeight: '85vh' }}>
          <div className="flex items-center justify-between mb-5 pt-1">
            <div>
              <h3 className="text-lg font-black" style={{ color: '#70191D' }}>収入・支出の設定</h3>
              <p className="text-xs" style={{ color: '#B07050' }}>なんぼ計算の元になる数字を入れてね</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm"
              style={{ background: '#EDD5C0', color: '#70191D' }}>✕</button>
          </div>

          <div className="space-y-5">
            {/* 月収 */}
            <div className="rounded-2xl p-4" style={{ background: '#FFF8F0', border: '1.5px solid #EDD5C0' }}>
              <AmountInput
                label="💰 月収（手取り）"
                name="monthlyIncome"
                value={local.monthlyIncome}
                onChange={handleChange}
                hint="税引き後の実際の手取り金額"
              />
            </div>

            {/* 固定費 */}
            <div className="rounded-2xl p-4" style={{ background: '#FFF8F0', border: '1.5px solid #EDD5C0' }}>
              <AmountInput
                label="🏠 毎月の固定費"
                name="monthlyFixedCost"
                value={local.monthlyFixedCost}
                onChange={handleChange}
                hint="家賃・光熱費・通信費・食費・交通費など"
              />
              <div className="flex gap-2 mt-3">
                {FIXED_COST_PRESETS.map(p => (
                  <button key={p.value} onClick={() => setPreset('monthlyFixedCost', p.value)}
                    className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-center transition-all active:scale-95"
                    style={Number(local.monthlyFixedCost) === p.value
                      ? { background: '#970A12', color: '#FECD6D' }
                      : { background: '#EDD5C0', color: '#70191D' }
                    }>
                    <span className="text-sm">{p.icon}</span>
                    <span className="text-[10px] font-black">{p.label}</span>
                    <span className="text-[9px] opacity-70">{formatCurrency(p.value)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 積立額 */}
            <div className="rounded-2xl p-4" style={{ background: '#FFF8F0', border: '1.5px solid #EDD5C0' }}>
              <AmountInput
                label="📈 毎月の積立・投資"
                name="monthlyInvestment"
                value={local.monthlyInvestment}
                onChange={handleChange}
                hint="NISA・投資信託・貯蓄などの合計"
              />
              <div className="flex gap-2 mt-3">
                {INVESTMENT_PRESETS.map(p => (
                  <button key={p.value} onClick={() => setPreset('monthlyInvestment', p.value)}
                    className="flex-1 py-2 rounded-xl text-xs font-black transition-all active:scale-95"
                    style={Number(local.monthlyInvestment) === p.value
                      ? { background: '#970A12', color: '#FECD6D' }
                      : { background: '#EDD5C0', color: '#70191D' }
                    }>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-2xl p-4"
              style={{ background: isNegative ? '#FFF0EE' : '#EEF3FA', border: `1.5px solid ${isNegative ? '#FFCDC8' : '#5686BB44'}` }}>
              <p className="text-xs font-black mb-2" style={{ color: isNegative ? '#970A12' : '#1A3A5C' }}>
                {isNegative ? '⚠️ このままだと赤字です' : '💡 プレビュー'}
              </p>
              <div className="space-y-1 text-xs" style={{ color: '#8B5840' }}>
                {[
                  ['月収', income],
                  ['− 固定費', fixed],
                  ['− 積立', investment],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span>{label}</span>
                    <span className="font-bold">{formatCurrency(val)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1.5 mt-1.5 font-black text-sm"
                  style={{ borderTop: '1px solid #EDD5C0', color: isNegative ? '#970A12' : '#5686BB' }}>
                  <span>＝ 自由なお金</span>
                  <span>{formatCurrency(free)}</span>
                </div>
              </div>
            </div>

            <button onClick={handleSave}
              className="w-full py-4 rounded-2xl font-black text-base shadow-lg transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #D1601F, #B04A10)', color: '#FECD6D' }}>
              保存する ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
