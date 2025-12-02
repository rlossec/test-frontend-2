type RadioOption = {
  label: string;
  value: string;
  description?: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
  variant?: "default" | "card";
};


export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selected,
  onChange,
  variant = "default",
}) => (
  <div
    className={`space-y-2 ${
      variant === "card" ? "divide-y divide-gray-200" : ""
    }`}
  >
    {options.map((option) => (
      <label
        key={option.value}
        className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer
          ${variant === "card" ? "hover:bg-background-alt" : ""}
          ${
            selected === option.value
              ? variant === "card"
                ? "bg-background-alt"
                : ""
              : ""
          }`}
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={selected === option.value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
        />
        <div className="flex-1">
          <div className={`font-medium`}>
            {option.label}
          </div>
          {option.description && (
            <div className="text-sm text-text-light mt-0.5">
              {option.description}
            </div>
          )}
        </div>
      </label>
    ))}
  </div>
);
