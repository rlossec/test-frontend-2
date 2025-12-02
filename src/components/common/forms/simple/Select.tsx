type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

export const Select = ({
  label,
  options,
  value,
  onChange,
  error,
  disabled = false,
  placeholder = "Sélectionnez une option",
}: SelectProps) => {
  return (
    <label className="block space-y-1">
      {label && (
        <span className="text-sm font-medium text-text-light">{label}</span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 ${
          error
            ? "border-error focus:ring-error"
            : "border-border focus:border-primary"
        } ${disabled ? "bg-background-alt cursor-not-allowed" : ""}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(
          ({ value: optValue, label: optLabel, disabled: optDisabled }) => (
            <option key={optValue} value={optValue} disabled={optDisabled}>
              {optLabel}
            </option>
          )
        )}
      </select>
      {error && <span className="text-sm text-error">{error}</span>}
    </label>
  );
};
