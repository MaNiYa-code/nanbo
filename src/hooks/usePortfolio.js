import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ASSET_CATEGORIES, SAMPLE_ASSETS } from '../utils/constants';

const INITIAL_STATE = {
  assets: SAMPLE_ASSETS,
  settings: {
    birthYear: 2001,
    monthlyIncome: 300000,
    monthlyFixedCost: 150000,   // 家賃・光熱費・食費など固定費
    monthlyInvestment: 30000,   // 毎月の積立額
  },
};

export function usePortfolio() {
  const [state, setState] = useLocalStorage('nanbo_v1', INITIAL_STATE);

  const totalAmount = useMemo(() =>
    state.assets.reduce((sum, a) => sum + (a.amount || 0), 0),
    [state.assets]
  );

  const categoryTotals = useMemo(() => {
    const totals = {};
    Object.keys(ASSET_CATEGORIES).forEach(k => { totals[k] = 0; });
    state.assets.forEach(a => {
      totals[a.category] = (totals[a.category] || 0) + a.amount;
    });
    return totals;
  }, [state.assets]);

  const categoryRatios = useMemo(() => {
    const ratios = {};
    Object.keys(categoryTotals).forEach(k => {
      ratios[k] = totalAmount > 0 ? categoryTotals[k] / totalAmount : 0;
    });
    return ratios;
  }, [categoryTotals, totalAmount]);

  const safeRatio = useMemo(() =>
    (categoryRatios.bank_account || 0) + (categoryRatios.cash || 0),
    [categoryRatios]
  );

  const investRatio = useMemo(() => 1 - safeRatio, [safeRatio]);

  const riskScore = useMemo(() => {
    if (totalAmount === 0) return 0;
    let score = 0;
    Object.entries(ASSET_CATEGORIES).forEach(([key, cat]) => {
      score += (categoryRatios[key] || 0) * cat.riskWeight;
    });
    return Math.round(score);
  }, [categoryRatios, totalAmount]);

  // ── なんぼ計算 ──────────────────────────────────
  const nanboAmount = useMemo(() => {
    const { monthlyIncome = 0, monthlyFixedCost = 0, monthlyInvestment = 0 } = state.settings;
    return monthlyIncome - monthlyFixedCost - monthlyInvestment;
  }, [state.settings]);

  const nanboPerDay  = useMemo(() => Math.floor(nanboAmount / 30), [nanboAmount]);
  const nanboPerWeek = useMemo(() => Math.floor(nanboAmount / 4.3), [nanboAmount]);

  const addAsset    = (asset) => {
    const newAsset = { ...asset, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setState(prev => ({ ...prev, assets: [...prev.assets, newAsset] }));
  };
  const updateAsset = (id, updates) =>
    setState(prev => ({ ...prev, assets: prev.assets.map(a => a.id === id ? { ...a, ...updates } : a) }));
  const deleteAsset = (id) =>
    setState(prev => ({ ...prev, assets: prev.assets.filter(a => a.id !== id) }));
  const updateSettings = (updates) =>
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...updates } }));

  return {
    assets: state.assets,
    settings: state.settings,
    totalAmount,
    categoryTotals,
    categoryRatios,
    safeRatio,
    investRatio,
    riskScore,
    nanboAmount,
    nanboPerDay,
    nanboPerWeek,
    addAsset,
    updateAsset,
    deleteAsset,
    updateSettings,
  };
}
