import { useState } from 'react';
import { ASSET_CATEGORIES } from '../../utils/constants';

const EMPTY_FORM = { name: '', category: 'bank_account', amount: '', note: '' };

const PLACEHOLDERS = {
  bank_account: '例: 楽天銀行、三菱UFJ、ゆうちょ...',
  cash:         '例: 財布の現金、タンス預金...',
  nisa:         '例: eMAXIS Slim 全世界株式...',
  mutual_fund:  '例: ひふみプラス、ニッセイ外国株...',
  jp_stock:     '例: トヨタ自動車、ソニーグループ...',
  us_stock:     '例: Apple (AAPL)、S&P500 (VOO)...',
  gold:         '例: 田中貴金属、三菱マテリアル...',
  crypto:       '例: ビットコイン、イーサリアム...',
  bond:         '例: 個人向け国債、社債...',
  other:        '例: 不動産、外貨預金...',
};

export function AssetForm({ onSubmit, onClose, initial }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('名前を入力してください'); return; }
    const amount = Number(form.amount);
    if (!amount || amount <= 0) { setError('正しい金額を入力してください'); return; }
    onSubmit({ ...form, amount });
    onClose();
  };

  const cat = ASSET_CATEGORIES[form.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(44,16,8,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-t-3xl shadow-2xl scale-in"
        style={{ background: '#FDF4EC' }}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 rounded-full" style={{ background: '#EDD5C0' }} />
        </div>

        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-5 pt-1">
            <h3 className="text-lg font-black" style={{ color: '#70191D' }}>
              {initial ? '資産を編集' : '資産を追加'}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm transition-all"
              style={{ background: '#EDD5C0', color: '#70191D' }}
            >✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category picker */}
            <div>
              <label className="block text-[10px] font-black tracking-[0.2em] uppercase mb-2"
                style={{ color: '#B07050' }}>カテゴリ</label>
              <div className="grid grid-cols-5 gap-1.5">
                {Object.entries(ASSET_CATEGORIES).map(([key, c]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, category: key }))}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all active:scale-95"
                    style={form.category === key
                      ? { borderColor: c.color, background: c.color + '15', transform: 'scale(1.05)' }
                      : { borderColor: '#EDD5C0', background: '#FFF8F0' }
                    }
                  >
                    <span className="text-xl leading-none">{c.icon}</span>
                    <span className="text-[9px] font-bold leading-tight text-center"
                      style={{ color: form.category === key ? c.color : '#8B5840' }}>
                      {c.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected category badge */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
              style={{ background: cat.color + '15', border: `1px solid ${cat.color}30` }}>
              <span className="text-xl">{cat.icon}</span>
              <div>
                <p className="text-xs font-black" style={{ color: cat.color }}>{cat.label}</p>
                <p className="text-[10px]" style={{ color: '#B07050' }}>を登録します</p>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[10px] font-black tracking-[0.2em] uppercase mb-1.5"
                style={{ color: '#B07050' }}>名前</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={PLACEHOLDERS[form.category]}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all"
                style={{
                  background: '#FFF8F0',
                  border: '1.5px solid #EDD5C0',
                  color: '#2C1008',
                }}
                onFocus={e => e.target.style.borderColor = '#D1601F'}
                onBlur={e => e.target.style.borderColor = '#EDD5C0'}
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[10px] font-black tracking-[0.2em] uppercase mb-1.5"
                style={{ color: '#B07050' }}>金額（円）</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-sm" style={{ color: '#8B5840' }}>¥</span>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full rounded-xl pl-8 pr-4 py-3 text-sm font-black focus:outline-none transition-all"
                  style={{ background: '#FFF8F0', border: '1.5px solid #EDD5C0', color: '#70191D' }}
                  onFocus={e => e.target.style.borderColor = '#D1601F'}
                  onBlur={e => e.target.style.borderColor = '#EDD5C0'}
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-[10px] font-black tracking-[0.2em] uppercase mb-1.5"
                style={{ color: '#B07050' }}>メモ（任意）</label>
              <input
                type="text"
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="例: 毎月3万積立中、生活防衛資金..."
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                style={{ background: '#FFF8F0', border: '1.5px solid #EDD5C0', color: '#2C1008' }}
                onFocus={e => e.target.style.borderColor = '#D1601F'}
                onBlur={e => e.target.style.borderColor = '#EDD5C0'}
              />
            </div>

            {error && (
              <p className="text-xs font-semibold px-3 py-2 rounded-xl"
                style={{ background: '#FFF0EE', color: '#970A12', border: '1px solid #FFCDC8' }}>
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-black text-base shadow-lg transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #D1601F, #B04A10)', color: '#FECD6D' }}
            >
              {initial ? '変更を保存 ✓' : '追加する ＋'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
