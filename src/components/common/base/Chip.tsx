import React from "react";

export type ChipVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error";
export type ChipSize = "sm" | "md" | "lg";

const variants = {
  default: "bg-background-alt text-text hover:bg-background",
  primary: "bg-primary text-background hover:bg-primary-dark",
  success: "bg-success text-background hover:bg-success-dark",
  warning: "bg-warning text-background hover:bg-warning-dark",
  error: "bg-error text-background hover:bg-error-dark",
};

const sizes = {
  sm: "h-6 text-xs px-2",
  md: "h-8 text-sm px-3",
  lg: "h-10 text-base px-4",
};

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  label: string;
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: React.ReactNode;
  clickable?: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      variant = "default",
      size = "md",
      icon,
      clickable = false,
      removable = false,
      onClick,
      onRemove,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-full transition-colors";
    const variantClasses = variants[variant];
    const sizeClasses = sizes[size];
    const clickableClasses = clickable ? "cursor-pointer" : "";
    const removableClasses = removable ? "pr-2" : "";

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (clickable && onClick) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${clickableClasses} ${removableClasses} ${className}`}
        onClick={handleClick}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
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
      </div>
    );
  }
);
