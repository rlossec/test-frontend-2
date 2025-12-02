import React from "react";
import type { ButtonSize, ButtonVariant } from "./Button";

type LabelPosition = "left" | "right";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  ariaLabel?: string;
  labelPosition?: LabelPosition;
  color?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

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
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Taille
    const sizeStyles = {
      sm: "px-2 py-1 text-sm gap-1 min-h-[32px]",
      md: "px-3 py-2 text-base gap-2 min-h-[40px]",
      lg: "px-4 py-2.5 text-lg gap-3 min-h-[48px]",
    };

    // Variantes
    const variantStyles = {
      solid: `bg-${color} text-background hover:bg-${color}-dark`,
      outline: `border border-${color} text-${color} hover:bg-${color} hover:text-background`,
      ghost: `text-${color} hover:bg-${color}-light/10`,
    };

    return (
      <button
        ref={ref}
        type={type}
        aria-label={!label ? ariaLabel : undefined}
        className={`
          ${baseStyles}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {label && labelPosition === "left" && <span>{label}</span>}
        {icon}
        {label && labelPosition === "right" && <span>{label}</span>}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
