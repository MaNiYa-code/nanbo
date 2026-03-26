import { useState } from 'react';
import { ASSET_CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import { AssetForm } from './AssetForm';

export function AssetList({ assets, onUpdate, onDelete }) {
  const [editTarget, setEditTarget] = useState(null);
  const [filter, setFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const usedCategories = [...new Set(assets.map(a => a.category))];
  const filters = [
    { key: 'all', label: 'すべて', emoji: '🗂' },
    ...usedCategories.map(key => ({
      key,
      label: ASSET_CATEGORIES[key]?.label || key,
      emoji: ASSET_CATEGORIES[key]?.icon || '●',
      color: ASSET_CATEGORIES[key]?.color,
    })),
  ];

  const filtered = filter === 'all' ? assets : assets.filter(a => a.category === filter);

  const handleDelete = (id) => {
    if (confirmDelete === id) {
      onDelete(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl mb-4">🌱</span>
        <p className="font-black text-base mb-1" style={{ color: '#70191D' }}>まだ資産が登録されていません</p>
        <p className="text-sm" style={{ color: '#B07050' }}>上のボタンから追加してみましょう！</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
        {filters.map(f => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={active
                ? { background: '#970A12', color: '#FECD6D', boxShadow: '0 2px 8px #970A1240' }
                : { background: '#FFF8F0', color: '#8B5840', border: '1.5px solid #EDD5C0' }
              }
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="space-y-2.5">
        {filtered.map((asset, i) => {
          const cat = ASSET_CATEGORIES[asset.category] || {};
          const isDeleting = confirmDelete === asset.id;
          return (
            <div
              key={asset.id}
              className="rounded-2xl p-4 transition-all fade-up"
              style={{
                background: isDeleting ? '#FFF0EE' : '#FFFFFF',
                border: `1.5px solid ${isDeleting ? '#FFCDC8' : '#EDD5C0'}`,
                animationDelay: `${i * 40}ms`,
                boxShadow: '0 1px 8px rgba(112,25,29,0.06)',
              }}
            >
              <div className="flex items-center gap-3">
                {/* Icon circle */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
                  style={{ background: (cat.color || '#ccc') + '18', border: `1px solid ${(cat.color || '#ccc')}25` }}
                >
                  {cat.icon || '💎'}
                </div>

                {/* Name + category chip */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate" style={{ color: '#2C1008' }}>{asset.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-md font-black"
                      style={{ background: (cat.color || '#ccc') + '18', color: cat.color || '#888' }}
                    >
                      {cat.label || asset.category}
                    </span>
                    {asset.note && (
                      <span className="text-[10px] truncate" style={{ color: '#B07050' }}>{asset.note}</span>
                    )}
                  </div>
                </div>

                {/* Amount + actions */}
                <div className="text-right flex-shrink-0">
                  <p className="font-black" style={{ color: '#70191D' }}>{formatCurrency(asset.amount)}</p>
                  <div className="flex gap-2 mt-1 justify-end">
                    <button
                      onClick={() => setEditTarget(asset)}
                      className="text-xs font-bold transition-colors"
                      style={{ color: '#5686BB' }}
                    >編集</button>
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="text-xs font-bold transition-colors"
                      style={{ color: isDeleting ? '#970A12' : '#C4A090' }}
                    >
                      {isDeleting ? '本当に削除？' : '削除'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editTarget && (
        <AssetForm
          initial={editTarget}
          onSubmit={data => onUpdate(editTarget.id, data)}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}
