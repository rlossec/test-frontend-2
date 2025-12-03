import { useState } from "react";
import { NotificationsCounter } from "./elements/NotificationsCounter";
import { ProfileSettingsButton } from "./elements/ProfileSettingsButton";
import { SearchBar } from "./elements/SearchBar";
import { ThemeToggle } from "./elements/ThemeToggle";
import { UserDropdown } from "./elements/UserDropdown";
import { MobileMenu } from "./elements/MobileMenu";
import { NavBar } from "./NavBar";
import { BoltIcon } from "../icons/others/BoltIcon";
import { MenuIcon } from "../icons/navigation/MenuIcon";
import { IconButton } from "../components/common/base/buttons/IconButton";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background-alt text-text">
      <div className="flex md:flex-row flex-col justify-between items-center p-4 border-b-2 border-border">
        {/* Logo + Navbar */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="px-2 flex items-center gap-2">
            <div className="bg-linear-to-br from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <BoltIcon className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-text-light">Techcorp</h1>
          </div>
          {/* Desktop Navbar */}
          <NavBar className="hidden md:flex" />
          {/* Mobile Menu Button */}
          <IconButton
            icon={<MenuIcon size={24} />}
            onClick={() => setIsMobileMenuOpen(true)}
            ariaLabel="Ouvrir le menu"
            variant="ghost"
            color="default"
            size="md"
            className="md:hidden"
          />
        </div>
        {/* Search Bar and Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <SearchBar />
          {/* Desktop only: ThemeToggle, NotificationsCounter, ProfileSettingsButton */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <NotificationsCounter />
            <ProfileSettingsButton />
          </div>
          <UserDropdown />
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
