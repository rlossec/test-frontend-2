import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { XIcon } from "../../icons/navigation/XIcon";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationsCounter } from "./NotificationsCounter";
import { ProfileSettingsButton } from "./ProfileSettingsButton";
import { UserDropdown } from "./UserDropdown";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Fermer le menu avec Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
  }, [isOpen, onClose]);

  const baseClass =
    "text-text-light hover:text-text transition-colors block py-2";
  const activeClass = "text-primary font-semibold";

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/tools", label: "Tools" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings" },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/75 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw]
          bg-background-alt border-l border-border
          shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          overflow-y-auto
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-light">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-background-alt transition-colors text-text-light"
            aria-label="Fermer le menu"
          >
            <XIcon size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 border-b border-border">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="p-4 border-b border-border">
          <div className="w-full">
            <SearchBar />
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-light">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-light">Notifications</span>
            <NotificationsCounter />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-light">Settings</span>
            <ProfileSettingsButton />
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-light">Account</span>
            <UserDropdown />
          </div>
        </div>
      </div>
    </>
  );
};
