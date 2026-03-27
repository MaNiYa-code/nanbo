import { useState } from 'react';
import { TotalSummary } from '../components/summary/TotalSummary';
import { AllocationPieChart } from '../components/charts/AllocationPieChart';
import { CategoryBreakdown } from '../components/summary/CategoryBreakdown';
import { AdvicePanel } from '../components/advice/AdvicePanel';
import { NanboCard } from '../components/nanbo/NanboCard';
import { NanboSettings } from '../components/nanbo/NanboSettings';
import { RISK_LEVELS } from '../utils/constants';

function Card({ label, children }) {
  return (
    <div className="halftone-corner rounded-3xl p-5 shadow-sm" style={{ background: '#FFFFFF', border: '1.5px solid #EDD5C0' }}>
      {label && (
        <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-4" style={{ color: '#B07050' }}>
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

function RiskMeter({ riskScore }) {
  const level = RISK_LEVELS.find(l => riskScore >= l.min && riskScore < l.max) || RISK_LEVELS[RISK_LEVELS.length - 1];
  return (
    <div className="rounded-3xl p-5 shadow-sm" style={{ background: '#FFFFFF', border: '1.5px solid #EDD5C0' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: '#B07050' }}>Risk Score</p>
          <p className="font-black text-base" style={{ color: '#2C1008' }}>{level.label}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-md"
          style={{ background: level.color + '22', color: level.color, border: `2px solid ${level.color}40` }}>
          {riskScore}
        </div>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden mb-1"
        style={{ background: 'linear-gradient(to right, #5686BB, #FECD6D, #D1601F, #970A12, #70191D)' }}>
        <div className="absolute right-0 top-0 h-full rounded-r-full transition-all duration-700"
          style={{ width: `${100 - riskScore}%`, background: '#FDF4EC', opacity: 0.7 }} />
      </div>
      <div className="relative h-3 -mt-3 mb-1">
        <div className="absolute top-0 w-3 h-3 rounded-full border-2 shadow-md transition-all duration-700"
          style={{ left: `calc(${riskScore}% - 6px)`, background: '#FFF8F0', borderColor: level.color }} />
      </div>
      <div className="flex justify-between text-[10px] font-semibold mb-3" style={{ color: '#C4A090' }}>
        <span>低リスク</span><span>高リスク</span>
      </div>
      <p className="text-xs font-medium px-3 py-2 rounded-xl" style={{ background: '#FFF8F0', color: '#8B5840' }}>
        {level.desc}
      </p>
    </div>
  );
}

export function Dashboard({
  assets, totalAmount, categoryTotals, categoryRatios,
  riskScore, safeRatio, investRatio,
  nanboAmount, nanboPerDay, nanboPerWeek,
  settings, onUpdateSettings,
}) {
  const [showNanboSettings, setShowNanboSettings] = useState(false);

  return (
    <div className="space-y-4 fade-up">

      {/* ★ NANBO CARD — メインフィーチャー */}
      <NanboCard
        nanboAmount={nanboAmount}
        nanboPerDay={nanboPerDay}
        nanboPerWeek={nanboPerWeek}
        settings={settings}
        onEdit={() => setShowNanboSettings(true)}
      />

      {/* 総資産サマリー */}
      <TotalSummary
        totalAmount={totalAmount}
        safeRatio={safeRatio ?? 0}
        investRatio={investRatio ?? 0}
        riskScore={riskScore}
      />

      {/* 資産配分 */}
      <Card label="資産配分">
        <AllocationPieChart categoryTotals={categoryTotals} totalAmount={totalAmount} />
      </Card>

      {/* カテゴリ内訳 */}
      <Card label="カテゴリ別内訳">
        <CategoryBreakdown categoryTotals={categoryTotals} categoryRatios={categoryRatios} />
      </Card>

      {/* リスクスコア */}
      <RiskMeter riskScore={riskScore} />

      {/* アドバイスプレビュー */}
      <Card label="アドバイス">
        <AdvicePanel
          assets={assets}
          categoryRatios={categoryRatios}
          riskScore={riskScore}
          totalAmount={totalAmount}
          limit={2}
        />
        {assets.length > 0 && (
          <p className="text-center text-xs font-bold mt-3" style={{ color: '#D1601F' }}>
            💡 「アドバイス」タブでさらに詳しく →
          </p>
        )}
      </Card>

      {/* なんぼ設定モーダル */}
      {showNanboSettings && (
        <NanboSettings
          settings={settings}
          onUpdateSettings={onUpdateSettings}
          onClose={() => setShowNanboSettings(false)}
        />
      )}
    </div>
  );
}
