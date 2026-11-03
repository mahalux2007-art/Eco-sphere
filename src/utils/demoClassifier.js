// DEMO-ONLY, LOCAL rule-based category suggestion.
// This runs entirely in the browser using simple keyword matching —
// it does NOT call any AI model or external service. It exists only to
// demonstrate where a real classification service could plug in later.

const RULES = [
  { category: 'Water', keywords: ['leak', 'faucet', 'sprinkler', 'flood', 'drip', 'pipe', 'water', 'fountain', 'hose', 'irrigation'] },
  { category: 'Energy', keywords: ['light', 'lights', 'power', 'electric', 'hvac', 'heating', 'ac', 'air condition', 'projector', 'outlet', 'energy'] },
  { category: 'Waste', keywords: ['trash', 'recycl', 'bin', 'garbage', 'compost', 'litter', 'dump', 'waste', 'overflow'] },
];

export function suggestCategory(title = '', description = '') {
  const text = `${title} ${description}`.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const rule of RULES) {
    const score = rule.keywords.reduce((count, kw) => (text.includes(kw) ? count + 1 : count), 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule.category;
    }
  }

  if (!bestMatch || bestScore === 0) {
    return { category: 'Other', confidence: 'low', matched: [] };
  }

  const matchedKeywords = RULES.find((r) => r.category === bestMatch).keywords.filter((kw) => text.includes(kw));

  return {
    category: bestMatch,
    confidence: bestScore >= 2 ? 'high' : 'medium',
    matched: matchedKeywords,
  };
}
