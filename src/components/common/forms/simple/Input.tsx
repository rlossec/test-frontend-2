import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  variant?: "outline" | "filled" | "underlined";
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  iconLeft,
  iconRight,
  variant = "outline",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles = `
    w-full px-4 py-2 rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary
  `;

  const variantStyles = {
    outline: "border border-border focus:border-primary",
    filled: "bg-background-alt border-transparent focus:bg-background-alt",
    underlined: "border-b border-border focus:border-primary rounded-none",
  };

  const disabledStyles = "bg-background-alt cursor-not-allowed opacity-50";
  const errorStyles = "border-error focus:border-error focus:ring-error";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-text-light">{label}</label>
      )}

      <div className="relative flex items-center">
        {iconLeft && (
          <div className="absolute left-3 text-text-light">{iconLeft}</div>
        )}

        <input
          className={`
            ${baseStyles} 
            ${variantStyles[variant]} 
            ${error ? errorStyles : ""} 
            ${disabled ? disabledStyles : ""}
            ${iconLeft ? "pl-10" : ""} 
            ${iconRight ? "pr-10" : ""} 

            ${className}
          `}
          disabled={disabled}
          {...props}
        />

        {iconRight && (
          <div className="absolute right-3 text-text-light">{iconRight}</div>
        )}
      </div>

      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
};
