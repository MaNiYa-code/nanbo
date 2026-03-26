import { useState } from 'react';
import { AssetList } from '../components/assets/AssetList';
import { AssetForm } from '../components/assets/AssetForm';
import { QUICK_ADD_PRESETS } from '../utils/constants';
import { formatCurrency } from '../utils/formatters';

export function AssetManagement({ assets, totalAmount, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [presetCategory, setPresetCategory] = useState(null);

  const openWithPreset = (category) => {
    setPresetCategory(category);
    setShowForm(true);
  };

  return (
    <div className="space-y-4 fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black" style={{ color: '#70191D' }}>資産管理</h2>
          <p className="text-xs font-medium" style={{ color: '#B07050' }}>
            合計 <span className="font-black" style={{ color: '#D1601F' }}>{formatCurrency(totalAmount)}</span>
          </p>
        </div>
        <button
          onClick={() => { setPresetCategory(null); setShowForm(true); }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #D1601F, #B04A10)', color: '#FECD6D' }}
        >
          <span className="text-lg leading-none">＋</span> 追加
        </button>
      </div>

      {/* Quick add presets */}
      <div className="rounded-3xl p-4" style={{ background: '#FFF8F0', border: '1.5px solid #EDD5C0' }}>
        <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-3" style={{ color: '#B07050' }}>
          クイック追加
        </p>
        <div className="grid grid-cols-3 gap-2">
          {QUICK_ADD_PRESETS.map(p => (
            <button
              key={p.category}
              onClick={() => openWithPreset(p.category)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95"
              style={{ background: '#FFFFFF', border: '1.5px solid #EDD5C0', color: '#70191D' }}
            >
              <span className="text-2xl">{p.emoji}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Asset list */}
      <AssetList assets={assets} onUpdate={onUpdate} onDelete={onDelete} />

      {showForm && (
        <AssetForm
          initial={presetCategory ? { name: '', category: presetCategory, amount: '', note: '' } : undefined}
          onSubmit={onAdd}
          onClose={() => { setShowForm(false); setPresetCategory(null); }}
        />
      )}
    </div>
  );
}
