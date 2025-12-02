import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  disabled = false,
  onChange,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only peer"
        />
        <div className="w-5 h-5 border-2 border-border rounded peer-checked:border-primary peer-checked:bg-primary transition-colors duration-200 peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2">
          {checked && (
            <svg
              className="w-4 h-4 text-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-text-light">{label}</span>
    </label>
  );
};
