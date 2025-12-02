import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  showCloseButton?: boolean;
  className?: string;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  footer?: React.ReactNode;
  centered?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
};

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  className = "",
  closeOnClickOutside = true,
  closeOnEsc = true,
  footer,
  hideHeader = false,
  hideFooter = false,
  contentClassName = "",
  headerClassName = "",
  footerClassName = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside && e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Overlay with blur */}
        <div
          className="fixed inset-0 bg-background/75 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        <div
          ref={contentRef}
          className={`
            relative transform overflow-hidden rounded-lg 
            bg-background-alt text-left shadow-xl 
            border border-border
            transition-all duration-300 ease-in-out
            ${sizeStyles[size]}
            ${className}
          `}
          role="dialog"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {/* Header */}
          {!hideHeader && (title || showCloseButton) && (
            <div
              className={`flex items-center justify-between border-b border-border px-6 py-4 ${headerClassName}`}
            >
              {title && (
                <h3 id="modal-title" className="text-lg font-medium text-text">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="rounded-md text-text-light hover:text-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={onClose}
                  aria-label="Fermer"
                >
                  <svg
                    className="h-6 w-6"
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
          )}

          {/* Content */}
          <div className={`px-6 py-4 ${contentClassName}`}>{children}</div>

          {/* Footer */}
          {!hideFooter && footer && (
            <div
              className={`border-t border-border bg-background-alt px-6 py-4 ${footerClassName}`}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
