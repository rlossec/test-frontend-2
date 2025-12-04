import React from "react";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonColor =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "default";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

// Mapping des couleurs pour chaque variante
const colorStyles: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    solid:
      "bg-primary text-background hover:bg-primary-dark focus:ring-primary",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-background focus:ring-primary",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary",
  },
  success: {
    solid:
      "bg-success text-background hover:bg-success-dark focus:ring-success",
    outline:
      "border border-success text-success hover:bg-success hover:text-background focus:ring-success",
    ghost: "text-success hover:bg-success/10 focus:ring-success",
  },
  warning: {
    solid:
      "bg-warning text-background hover:bg-warning-dark focus:ring-warning",
    outline:
      "border border-warning text-warning hover:bg-warning hover:text-background focus:ring-warning",
    ghost: "text-warning hover:bg-warning/10 focus:ring-warning",
  },
  error: {
    solid: "bg-error text-background hover:bg-error-dark focus:ring-error",
    outline:
      "border border-error text-error hover:bg-error hover:text-background focus:ring-error",
    ghost: "text-error hover:bg-error/10 focus:ring-error",
  },
  default: {
    solid: "bg-background-alt text-text hover:bg-background focus:ring-border",
    outline:
      "border border-border text-text hover:bg-background-alt focus:ring-border",
    ghost: "text-text hover:bg-background-alt focus:ring-border",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "primary",
      variant = "solid",
      size = "md",
      disabled = false,
      className = "",
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Styles de base communs à tous les boutons
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Styles de taille
    const sizeStyles = {
      xs: "py-1 px-2 text-xs min-h-[24px] gap-1",
      sm: "py-1.5 px-3 text-sm min-h-[32px] gap-1.5",
      md: "py-2 px-4 text-base min-h-[40px] gap-2",
      lg: "py-2.5 px-5 text-lg min-h-[48px] gap-2.5",
    };

    const colorVariantStyles = colorStyles[color][variant];

    return (
      <button
        ref={ref}
        type={type}
        className={`${baseStyles} ${sizeStyles[size]} ${colorVariantStyles} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
