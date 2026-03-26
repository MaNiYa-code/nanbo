export const ADVICE_RULES = [
  {
    id: 'no_assets',
    condition: ({ totalAmount }) => totalAmount === 0,
    priority: 0,
    type: 'info',
    title: '資産を登録しましょう！',
    message: 'まずは今持っている資産を登録してみましょう。現金・預金だけでも構いません。',
    action: '資産管理タブから追加してみよう',
    emoji: '🚀',
  },
  {
    id: 'too_much_crypto',
    condition: ({ ratios }) => ratios.crypto > 0.30,
    priority: 1,
    type: 'warning',
    title: '暗号通貨の比率が高すぎます',
    message: '暗号通貨が総資産の30%を超えています。価格変動が非常に大きく、大きな損失リスクがあります。20代でも許容できるのは全体の10〜20%程度が目安です。',
    action: '投資信託や株式への分散を検討しましょう',
    emoji: '⚠️',
  },
  {
    id: 'no_emergency_fund',
    condition: ({ ratios }) => (ratios.cash || 0) + (ratios.bank_account || 0) < 0.10,
    priority: 2,
    type: 'warning',
    title: '生活防衛資金が不足しています',
    message: '現金・銀行預金が総資産の10%未満です。急な出費や収入減に備え、生活費3〜6ヶ月分を現金・預金で確保しておくことが重要です。',
    action: 'まず生活防衛資金を確保してから投資を増やしましょう',
    emoji: '🛡️',
  },
  {
    id: 'too_much_cash',
    condition: ({ ratios }) => (ratios.cash || 0) + (ratios.bank_account || 0) > 0.60,
    priority: 3,
    type: 'tip',
    title: '現金が多すぎるかもしれません',
    message: '現金・預金が60%以上を占めています。20代はリスク許容度が高く、長期投資で資産を増やすチャンスの時期です。インフレによる現金の価値目減りにも注意が必要です。',
    action: '毎月少額でも投資信託の積立を始めましょう',
    emoji: '💡',
  },
  {
    id: 'no_diversification',
    condition: ({ assets }) => {
      const categories = new Set(assets.map(a => a.category));
      return categories.size <= 1 && assets.length > 0;
    },
    priority: 4,
    type: 'tip',
    title: '資産の種類を増やしましょう',
    message: '現在1種類の資産しかありません。「卵を一つのかごに盛るな」の格言通り、異なる資産クラスに分散することでリスクを下げられます。',
    action: '投資信託や株式など複数の資産を組み合わせましょう',
    emoji: '🥚',
  },
  {
    id: 'good_diversification',
    condition: ({ assets }) => {
      const categories = new Set(assets.map(a => a.category));
      return categories.size >= 3;
    },
    priority: 8,
    type: 'success',
    title: '上手く分散できています！',
    message: '3種類以上の資産に分散できています。リスクの異なる資産を組み合わせることで、安定した資産形成が期待できます。',
    action: '引き続き定期的なリバランスを心がけましょう',
    emoji: '✅',
  },
  {
    id: 'good_cash_ratio',
    condition: ({ ratios }) => {
      const safeTotal = (ratios.cash || 0) + (ratios.bank_account || 0);
      return safeTotal >= 0.15 && safeTotal <= 0.40;
    },
    priority: 9,
    type: 'success',
    title: '生活防衛資金は確保できています',
    message: '現金比率が適切な範囲内です。万が一の備えがあるので、残りの資産を安心して長期投資に回せます。',
    action: 'このバランスを維持しながら投資を続けましょう',
    emoji: '💰',
  },
  {
    id: 'start_nisa',
    condition: ({ assets, totalAmount }) => totalAmount > 0 && assets.every(a => a.category !== 'mutual_fund' && a.category !== 'nisa'),
    priority: 5,
    type: 'tip',
    title: 'NISAで投資信託を始めてみませんか？',
    message: '2024年から新NISAが始まり、年間360万円まで非課税で投資できます。20代から積立NISAを活用すると、複利効果で老後の資産形成に大きな差が生まれます。',
    action: '証券口座でeMAXIS Slim全世界株式などを検討してみましょう',
    emoji: '📈',
  },
  {
    id: 'high_risk_young',
    condition: ({ riskScore }) => riskScore >= 60,
    priority: 6,
    type: 'info',
    title: '20代はリスクを取れる時期です',
    message: '現在のポートフォリオは積極的な運用です。20代は時間という最大の武器があります。短期的な下落に慌てず、長期保有を心がけることが大切です。',
    action: '毎月の積立で平均取得単価を下げる戦略（ドルコスト平均法）が有効です',
    emoji: '⏰',
  },
  {
    id: 'low_risk_info',
    condition: ({ riskScore }) => riskScore < 30 && riskScore > 0,
    priority: 7,
    type: 'info',
    title: 'もう少しリターンを狙えるかもしれません',
    message: '現在は安全志向のポートフォリオです。20代は収入も増えていく時期で、長期的には株式など少しリスクのある資産も組み込むと、資産成長が期待できます。',
    action: 'まずは少額の投資信託積立から試してみましょう',
    emoji: '🌱',
  },
];

export const BASIC_KNOWLEDGE = [
  {
    id: 'compound',
    title: '複利の力',
    icon: '📈',
    content: '20歳から毎月3万円を年利5%で積み立てると、65歳時には約5,700万円になります。30歳から始めると約3,200万円。10年早く始めるだけで約2,500万円の差が生まれます。',
  },
  {
    id: 'nisa',
    title: '新NISA活用術',
    icon: '🏛️',
    content: '2024年から始まった新NISAは、年間360万円（つみたて120万円＋成長投資240万円）まで非課税で投資できます。運用益に通常かかる約20%の税金が0円になるお得な制度です。',
  },
  {
    id: 'diversification',
    title: '分散投資の基本',
    icon: '🎯',
    content: '国・地域・資産クラスを分散することでリスクを軽減できます。「全世界株式インデックスファンド」1本で世界中の約3,000社に分散投資できるので、初心者に最適です。',
  },
  {
    id: 'dca',
    title: 'ドルコスト平均法',
    icon: '📅',
    content: '毎月一定額を定期購入することで、高い時は少なく・安い時は多く買えるため、平均取得単価を下げられます。相場を気にせず淡々と積み立てることが重要です。',
  },
];
