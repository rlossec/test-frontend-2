import { type ReactNode } from "react";
import { DangerIcon } from "../../../icons/state/DangerIcon";

interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function FormField({
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  icon,
  className = "",
  children,
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label
          className={`
            block text-sm font-medium
            ${error ? "text-red" : "text-text-light"}
            ${disabled ? "opacity-50" : ""}
          `}
        >
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div
            className={`
              absolute left-3 top-1/2 -translate-y-1/2
              text-text-light
              ${disabled ? "opacity-50" : ""}
            `}
          >
            {icon}
          </div>
        )}

        {/* Input with icon padding if needed */}
        <div className={icon ? "pl-10" : ""}>{children}</div>

        {/* Error icon */}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red">
            <DangerIcon />
          </div>
        )}
      </div>

      {/* Helper text or error message */}
      {(helperText || error) && (
        <p
          className={`
            text-sm
            ${error ? "text-red" : "text-text-light"}
            ${disabled ? "opacity-50" : ""}
          `}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
