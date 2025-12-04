import React from "react";
import type { ButtonSize, ButtonVariant, ButtonColor } from "./Button";

type LabelPosition = "left" | "right";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  ariaLabel?: string;
  labelPosition?: LabelPosition;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

// Mapping des couleurs pour chaque variante
const colorStyles: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    solid: "bg-primary text-background hover:bg-primary-dark",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-background",
    ghost: "text-primary hover:bg-primary/10",
  },
  success: {
    solid: "bg-success text-background hover:bg-success-dark",
    outline:
      "border border-success text-success hover:bg-success hover:text-background",
    ghost: "text-success hover:bg-success/10",
  },
  warning: {
    solid: "bg-warning text-background hover:bg-warning-dark",
    outline:
      "border border-warning text-warning hover:bg-warning hover:text-background",
    ghost: "text-warning hover:bg-warning/10",
  },
  error: {
    solid: "bg-error text-background hover:bg-error-dark",
    outline:
      "border border-error text-error hover:bg-error hover:text-background",
    ghost: "text-error hover:bg-error/10",
  },
  default: {
    solid: "bg-background-alt text-text hover:bg-background",
    outline: "border border-border text-text hover:bg-background-alt",
    ghost: "text-text hover:bg-background-alt",
  },
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      label,
      ariaLabel,
      labelPosition = "right",
      color = "primary",
      variant = "ghost",
      size = "md",
      disabled = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    // Taille
    const sizeStyles = {
      xs: "p-1 text-xs gap-0.5 min-h-[24px] min-w-[24px]",
      sm: "px-2 py-1 text-sm gap-1 min-h-[32px]",
      md: "px-3 py-2 text-base gap-2 min-h-[40px]",
      lg: "px-4 py-2.5 text-lg gap-3 min-h-[48px]",
    };

    const colorVariantStyles = colorStyles[color][variant];

    return (
      <button
        ref={ref}
        type={type}
        aria-label={!label ? ariaLabel : undefined}
        className={`${baseStyles} ${sizeStyles[size]} ${colorVariantStyles} ${className}`}
        disabled={disabled}
        {...props}
      >
        {label && labelPosition === "left" && <span>{label}</span>}
        <span className="shrink-0">{icon}</span>
        {label && labelPosition === "right" && <span>{label}</span>}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
