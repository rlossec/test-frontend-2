import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../icons/actions/CloseIcon";
import { CheckCircleIcon } from "../../icons/state/CheckCircleIcon";
import { DangerIcon } from "../../icons/state/DangerIcon";
import { InfoIcon } from "../../icons/state/InfoIcon";

export type ToastType =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProps {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  onClose?: () => void;
  showProgress?: boolean;
  title?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toastStyles: Record<ToastType, { icon: React.ReactNode; color: string }> =
  {
    primary: {
      icon: <InfoIcon />,
      color: "primary",
    },
    secondary: {
      icon: <InfoIcon />,
      color: "secondary",
    },
    success: {
      icon: <CheckCircleIcon />,
      color: "success",
    },
    warning: {
      icon: <DangerIcon />,
      color: "warning",
    },
    error: {
      icon: <DangerIcon />,
      color: "error",
    },
  };

const positionStyles: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "center-right": "top-1/2 right-4 -translate-y-1/2",
  "center-left": "top-1/2 left-4 -translate-y-1/2",
  "center-center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "primary",
  position = "top-right",
  duration = 5000,
  onClose,
  showProgress = true,
  title,
  action,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const { icon, color } = toastStyles[type];

  useEffect(() => {
    if (duration === 0) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = (remaining / duration) * 100;

      if (remaining <= 0) {
        clearInterval(timer);
        setIsVisible(false);
        onClose?.();
      } else {
        setProgress(newProgress);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return createPortal(
    <div
      className={`
        fixed ${positionStyles[position]} z-50 
        w-full max-w-sm overflow-hidden 
        rounded-lg bg-background-alt shadow-lg 
        border border-border
        transition-all duration-300 ease-in-out
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className={`flex-shrink-0 text-${color}`}>{icon}</div>
          <div className="ml-3 w-0 flex-1">
            {title && <p className="text-sm font-medium text-text">{title}</p>}
            <p className="mt-1 text-sm text-text-light">{message}</p>
            {action && (
              <div className="mt-3">
                <button
                  type="button"
                  className={`text-sm font-medium text-${color} hover:text-${color}-dark transition-colors`}
                  onClick={() => {
                    action.onClick();
                    setIsVisible(false);
                    onClose?.();
                  }}
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md text-text-light hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
            >
              <span className="sr-only">Fermer</span>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
      {showProgress && duration > 0 && (
        <div
          className={`h-1 bg-${color} transition-all duration-10`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>,
    document.body
  );
};
