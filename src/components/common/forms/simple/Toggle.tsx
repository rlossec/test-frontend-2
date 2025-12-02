import React from "react";

interface ToggleProps {
  label: string;
  value: boolean;
  disabled?: boolean;
  onChange: (enabled: boolean) => void;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  disabled = false,
  onChange,
  className = "",
}) => {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <label
      className={`inline-flex items-center gap-3 cursor-pointer ${className}`}
    >
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
          value ? "bg-primary" : "bg-background"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleToggle}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-background-alt transition-transform duration-200 ease-in-out ${
            value ? "translate-x-6" : "translate-x-1"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </div>
      <span className="text-sm text-text-light">{label}</span>
    </label>
  );
};
