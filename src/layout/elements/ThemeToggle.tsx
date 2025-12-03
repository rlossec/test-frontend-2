import { IconButton } from "../../components/common/base/buttons/IconButton";
import { useTheme } from "../../hooks/useTheme";
import { MoonIcon } from "../../icons/others/MoonIcon";
import { SunIcon } from "../../icons/others/SunIcon";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      icon={
        theme === "light" ? (
          <MoonIcon size={20} />
        ) : (
          <SunIcon size={20} className="text-warning" />
        )
      }
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-background-alt transition-colors text-text-light cursor-pointer"
      aria-label={`Basculer vers le thème ${
        theme === "light" ? "sombre" : "clair"
      }`}
      title={`Thème actuel: ${theme === "light" ? "Clair" : "Sombre"}`}
    />
  );
};
