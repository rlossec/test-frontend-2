export type StatusVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default";

export interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  capitalize?: boolean;
  className?: string;
}

// Mapping des variants vers les classes de gradient
const gradientStyles: Record<StatusVariant, string> = {
  success: "bg-gradient-to-r from-success to-cyan-700",
  warning: "bg-gradient-to-r from-orange-400 to-orange-700 text-background",
  error: "bg-gradient-to-r from-error-dark to-pink-700 text-background",
  info: "bg-gradient-to-r from-primary via-primary-dark to-primary-dark text-background",
  default: "bg-background-alt text-text border border-border",
};

/**
 * Fonction utilitaire pour capitaliser la première lettre d'une chaîne
 */
const capitalizeFirst = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const StatusBadge = ({
  status,
  variant = "default",
  capitalize = true,
  className = "",
}: StatusBadgeProps) => {
  const displayText = capitalize ? capitalizeFirst(status) : status;
  const gradientClass = gradientStyles[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-white text-xs font-medium ${gradientClass} ${className}`}
    >
      {displayText}
    </span>
  );
};
