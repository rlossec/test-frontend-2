import { Chip } from "../../base/Chip";

interface ChipsFilterProps<T> {
  label?: string;
  options: T[];
  selectedOptions: T[];
  onChange: (options: T[]) => void;
}

export const ChipsFilter = <T extends string | number>({
  label,
  options,
  selectedOptions,
  onChange,
}: ChipsFilterProps<T>) => {
  // Gère le clic sur une puce
  const handleChipClick = (option: T) => {
    // Si l'option cliquée est déjà sélectionnée, la retirer du tableau
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((opt) => opt !== option));
    }
    // Sinon, l'ajouter au tableau
    else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <h3 className="text-sm font-semibold">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <Chip
              key={option}
              label={String(option)}
              clickable
              onClick={() => handleChipClick(option)}
              variant={isSelected ? "primary" : "default"}
            />
          );
        })}
      </div>
    </div>
  );
};
