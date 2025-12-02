import React from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
export type BadgeSize = "sm" | "md" | "lg";

const variants = {
  default: "bg-background-alt text-text",
  primary: "bg-primary text-background",
  success: "bg-success text-background",
  warning: "bg-warning text-background",
  error: "bg-error text-background",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-base",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  removable = false,
  onRemove,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors";
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  const removableClasses = removable ? "pr-1" : "";

  return (
    <span
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${removableClasses} ${className}`}
      {...props}
    >
      {children}
      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 rounded-full hover:bg-black/10 p-0.5"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
};
