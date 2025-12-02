import React from "react";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

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
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Styles de taille
    const sizeStyles = {
      sm: "py-1.5 px-3 text-sm min-h-[32px]",
      md: "py-2 px-4 text-base min-h-[40px]",
      lg: "py-2.5 px-5 text-lg min-h-[48px]",
    };

    // Styles de variante
    const variantStyles = {
      solid: `bg-${color} text-background hover:bg-${color}-dark`,
      outline: `border border-${color} text-${color} hover:bg-${color} hover:text-background`,
      ghost: `text-${color} hover:bg-${color}-light/10`,
    };

    return (
      <button
        ref={ref}
        type={type}
        className={`
          ${baseStyles}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
