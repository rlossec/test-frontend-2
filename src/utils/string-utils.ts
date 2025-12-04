export const capitalizeFirst = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formate une valeur numérique en euros
 * @param value - Valeur à formater
 * @returns Chaîne formatée avec le symbole € et séparateurs de milliers
 */
export const formatCurrency = (value: number): string => {
  return `€${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
