import { useState } from 'react';
import { usePortfolio } from './hooks/usePortfolio';
import { Dashboard } from './pages/Dashboard';
import { AssetManagement } from './pages/AssetManagement';
import { AdvicePage } from './pages/AdvicePage';

const TABS = [
  { id: 'dashboard', label: 'ホーム',    emoji: '📊' },
  { id: 'assets',    label: '資産',      emoji: '💼' },
  { id: 'advice',    label: 'アドバイス', emoji: '💡' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const portfolio = usePortfolio();

  return (
    <div className="min-h-screen" style={{ background: '#FDF4EC' }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b"
        style={{ background: 'rgba(253,244,236,0.92)', backdropFilter: 'blur(16px)', borderColor: '#EDD5C0' }}>
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #970A12, #70191D)' }}>
              <span className="text-lg font-black" style={{ color: '#FECD6D' }}>な</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black tracking-[0.18em] text-base" style={{ color: '#70191D' }}>NANBO</span>
              <span className="text-[10px] font-semibold tracking-wide" style={{ color: '#B07050' }}>なんぼ使える？を、いつでも。</span>
            </div>
          </div>
          <div className="text-xs font-semibold px-2.5 py-1 rounded-lg"
            style={{ background: '#FECD6D33', color: '#8B4513' }}>
            {new Date().toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </header>

      {/* ヘッダー下ハーフトーン区切り */}
      <div className="halftone-divider max-w-md mx-auto" />

      {/* ── Main content ── */}
      <main className="max-w-md mx-auto px-4 py-5 pb-28">
        {activeTab === 'dashboard' && (
          <Dashboard
            assets={portfolio.assets}
            totalAmount={portfolio.totalAmount}
            categoryTotals={portfolio.categoryTotals}
            categoryRatios={portfolio.categoryRatios}
            riskScore={portfolio.riskScore}
            safeRatio={portfolio.safeRatio}
            investRatio={portfolio.investRatio}
            nanboAmount={portfolio.nanboAmount}
            nanboPerDay={portfolio.nanboPerDay}
            nanboPerWeek={portfolio.nanboPerWeek}
            settings={portfolio.settings}
            onUpdateSettings={portfolio.updateSettings}
          />
        )}
        {activeTab === 'assets' && (
          <AssetManagement
            assets={portfolio.assets}
            totalAmount={portfolio.totalAmount}
            onAdd={portfolio.addAsset}
            onUpdate={portfolio.updateAsset}
            onDelete={portfolio.deleteAsset}
          />
        )}
        {activeTab === 'advice' && (
          <AdvicePage
            assets={portfolio.assets}
            categoryRatios={portfolio.categoryRatios}
            riskScore={portfolio.riskScore}
            totalAmount={portfolio.totalAmount}
            settings={portfolio.settings}
            onUpdateSettings={portfolio.updateSettings}
          />
        )}
      </main>

      {/* ── Bottom Navigation ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex border-t"
            style={{ background: 'rgba(253,244,236,0.96)', backdropFilter: 'blur(16px)', borderColor: '#EDD5C0' }}>
            {TABS.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex flex-col items-center gap-0.5 pt-2 pb-5 relative transition-all"
                >
                  {active && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-b-full"
                      style={{ background: '#970A12' }} />
                  )}
                  <span className={`text-xl transition-all ${active ? 'scale-110' : 'scale-95 opacity-40'}`}>
                    {tab.emoji}
                  </span>
                  <span className="text-xs font-bold transition-colors"
                    style={{ color: active ? '#70191D' : '#B07050' }}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
