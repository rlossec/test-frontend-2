export const FICTIVE_DATE = new Date("2025-05-01");

export const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Design",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Communication",
] as const;

export const TOOL_CATEGORIES = [
  "Communication",
  "Development",
  "Design",
  "Productivity",
  "Analytics",
  "Security",
  "Marketing",
  "HR",
  "Finance",
  "Infrastructure",
  "Project Management",
  "Sales & Marketing",
] as const;

// Statuts d'outils - Source de vérité pour les statuts d'outils
export const TOOL_STATUSES = ["active", "unused", "expiring"] as const;

// Coût maximum pour les outils (utilisé pour les filtres)
export const MAX_TOOL_COST = 3000;

// Palette de couleurs pour les graphiques
export const CHART_COLORS = [
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f59e0b", // amber-500
  "#10b981", // emerald-500
  "#ef4444", // red-500
  "#06b6d4", // cyan-500
  "#f97316", // orange-500
  "#6366f1", // indigo-500
  "#14b8a6", // teal-500
] as const;

/**
 * Obtient une couleur de la palette par index (avec rotation si nécessaire)
 * @param index - Index de l'élément
 * @returns Code couleur hexadécimal
 */
export const getChartColor = (index: number): string => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

/**
 * Obtient une couleur basée sur un ratio pour créer un dégradé
 * Utile pour les graphiques où on veut un dégradé du plus au moins (ex: coûts)
 * @param index - Index de l'élément
 * @param total - Nombre total d'éléments
 * @param reverse - Si true, inverse le dégradé (du moins au plus)
 * @returns Code couleur hexadécimal
 */
export const getGradientColor = (
  index: number,
  total: number,
  reverse = false
): string => {
  // Palette de dégradé du rouge (chaud/élevé) au bleu (froid/faible)
  const gradientColors = [
    "#ef4444", // red-500 (le plus élevé)
    "#f97316", // orange-500
    "#f59e0b", // amber-500
    "#eab308", // yellow-500
    "#84cc16", // lime-500
    "#22c55e", // green-500
    "#10b981", // emerald-500
    "#14b8a6", // teal-500
    "#06b6d4", // cyan-500
    "#3b82f6", // blue-500 (le plus faible)
  ];

  const ratio = index / Math.max(total - 1, 1);
  const colorIndex = Math.floor(ratio * (gradientColors.length - 1));
  const finalIndex = reverse
    ? gradientColors.length - 1 - colorIndex
    : colorIndex;
  return gradientColors[finalIndex];
};
