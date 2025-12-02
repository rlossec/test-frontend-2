import React, { useState } from "react";

type TooltipPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

type TooltipTheme = "primary" | "secondary" | "success" | "warning" | "error";

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  position?: TooltipPosition;
  theme?: TooltipTheme;
  delay?: number;
  className?: string;
  arrow?: boolean;
  maxWidth?: string;
  disabled?: boolean;
}

const themeStyles: Record<
  TooltipTheme,
  { bg: string; text: string; borderColor: string }
> = {
  primary: {
    bg: "bg-primary",
    text: "text-background",
    borderColor: "border-primary",
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-background",
    borderColor: "border-secondary",
  },
  success: {
    bg: "bg-success",
    text: "text-background",
    borderColor: "border-success",
  },
  warning: {
    bg: "bg-warning",
    text: "text-background",
    borderColor: "border-warning",
  },
  error: {
    bg: "bg-error",
    text: "text-background",
    borderColor: "border-error",
  },
};

const positionStyles: Record<
  TooltipPosition,
  { tooltip: string; arrow: string }
> = {
  top: {
    tooltip: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    arrow:
      "top-full left-1/2 -translate-x-1/2 border-t-[var(--border-color)] border-x-transparent border-b-transparent",
  },
  "top-start": {
    tooltip: "bottom-full mb-2 left-0",
    arrow:
      "top-full left-4 border-t-[var(--border-color)] border-x-transparent border-b-transparent",
  },
  "top-end": {
    tooltip: "bottom-full mb-2 right-0",
    arrow:
      "top-full right-4 border-t-[var(--border-color)] border-x-transparent border-b-transparent",
  },
  bottom: {
    tooltip: "top-full mt-2 left-1/2 -translate-x-1/2",
    arrow:
      "bottom-full left-1/2 -translate-x-1/2 border-b-[var(--border-color)] border-x-transparent border-t-transparent",
  },
  "bottom-start": {
    tooltip: "top-full mt-2 left-0",
    arrow:
      "bottom-full left-4 border-b-[var(--border-color)] border-x-transparent border-t-transparent",
  },
  "bottom-end": {
    tooltip: "top-full mt-2 right-0",
    arrow:
      "bottom-full right-4 border-b-[var(--border-color)] border-x-transparent border-t-transparent",
  },
  left: {
    tooltip: "right-full mr-2 top-1/2 -translate-y-1/2",
    arrow:
      "left-full top-1/2 -translate-y-1/2 border-l-[var(--border-color)] border-y-transparent border-r-transparent",
  },
  "left-start": {
    tooltip: "right-full mr-2 top-0",
    arrow:
      "left-full top-4 border-l-[var(--border-color)] border-y-transparent border-r-transparent",
  },
  "left-end": {
    tooltip: "right-full mr-2 bottom-0",
    arrow:
      "left-full bottom-4 border-l-[var(--border-color)] border-y-transparent border-r-transparent",
  },
  right: {
    tooltip: "left-full ml-2 top-1/2 -translate-y-1/2",
    arrow:
      "right-full top-1/2 -translate-y-1/2 border-r-[var(--border-color)] border-y-transparent border-l-transparent",
  },
  "right-start": {
    tooltip: "left-full ml-2 top-0",
    arrow:
      "right-full top-4 border-r-[var(--border-color)] border-y-transparent border-l-transparent",
  },
  "right-end": {
    tooltip: "left-full ml-2 bottom-0",
    arrow:
      "right-full bottom-4 border-r-[var(--border-color)] border-y-transparent border-l-transparent",
  },
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  theme = "primary",
  delay = 0,
  className = "",
  arrow = true,
  maxWidth = "200px",
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const { bg, text } = themeStyles[theme];
  const { tooltip: positionClasses, arrow: arrowClasses } =
    positionStyles[position];



  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isVisible && !disabled && (
        <div
          className={`
            absolute ${positionClasses} ${bg} ${text}
            px-3 py-2 rounded-lg shadow-lg z-50
            text-sm whitespace-normal break-words
            transition-opacity duration-200
          `}
          style={
            {
              maxWidth,
              "--border-color": `var(--color-${theme})`,
            } as React.CSSProperties
          }
          role="tooltip"
        >
          {content}
          {arrow && (
            <div
              className={`
                absolute w-0 h-0
                border-solid border-4
                ${arrowClasses}
              `}
            />
          )}
        </div>
      )}
    </div>
  );
};
