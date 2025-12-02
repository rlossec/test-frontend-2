type DateFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

export const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  error,
  disabled = false,
}) => (
  <label className="block space-y-1">
    {label && (
      <span className="text-sm font-medium text-text-light">{label}</span>
    )}
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full rounded border px-3 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
        error
          ? "border-error focus:ring-error"
          : "border-border focus:border-primary"
      } ${disabled ? "bg-background-alt cursor-not-allowed" : ""}`}
    />
    {error && <span className="text-sm text-error">{error}</span>}
  </label>
);
