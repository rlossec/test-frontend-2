import React from "react";

type GradientButtonProps = {
  color?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const GradientButton = ({
  color = "primary",
  children,
  className = "",
  ...props
}: GradientButtonProps) => {
  return (
    <button
      type="button"
      className={`
        bg-gradient-to-r from-${color} via-${color}-dark to-${color}-dark
        hover:bg-gradient-to-br
        focus:ring-${color}-light
        font-medium rounded-lg text-sm px-5 py-2.5 text-center
        text-background
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
