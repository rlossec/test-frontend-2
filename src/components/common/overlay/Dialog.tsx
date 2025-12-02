import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../icons/actions/CloseIcon";
import { Button } from "../base/buttons/Button";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  className = "",
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className="fixed inset-0 bg-background/75 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        <div
          className={`
            relative transform overflow-hidden rounded-lg 
            bg-background-alt text-left shadow-xl 
            border border-border
            transition-all duration-300 ease-in-out
            ${sizeStyles[size]}
            ${className}
          `}
        >
          {title && (
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-text">{title}</h3>
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    onClick={onClose}
                  >
                    <span className="sr-only">Fermer</span>
                    <CloseIcon />
                  </Button>
                )}
              </div>
            </div>
          )}

          {!title && showCloseButton && (
            <div className="absolute right-4 top-4">
              <Button
                variant="ghost"
                onClick={onClose}
              >
                <span className="sr-only">Fermer</span>
                <CloseIcon />
              </Button>
            </div>
          )}

          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};
