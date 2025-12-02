import type { HTMLAttributes } from "react";

interface IconProps extends HTMLAttributes<SVGElement> {
  size?: number | string;
  strokeWidth?: number;
  fill?: boolean;
}

export const Icon = ({
  children,
  className = "",
  size = 24,
  strokeWidth = 1.5,
  fill = false,
  ...props
}: IconProps) => {
  const classes = [fill ? "fill-current" : "fill-none", className]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      width={size}
      height={size}
      className={classes}
      {...props}
    >
      {children}
    </svg>
  );
};
