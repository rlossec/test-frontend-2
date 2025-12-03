import { DropdownMenu } from "../../components/common/layout/DropdownMenu";
import { DropdownMenuItem } from "../../components/common/layout/DropdownMenuItem";
import { Avatar } from "../../components/common/base/Avatar";
import { PersonIcon } from "../../icons/user-interface/PersonIcon";
import { SettingsIcon } from "../../icons/user-interface/SettingsIcon";
import { PowerIcon } from "../../icons/state/PowerIcon";
import { ChevronDownIcon } from "../../icons/navigation/ChevronDownIcon";
import { MoonIcon } from "../../icons/others/MoonIcon";
import { SunIcon } from "../../icons/others/SunIcon";
import { BellIcon } from "../../icons/state/BellIcon";
import { useTheme } from "../../hooks/useTheme";

export const UserDropdown = () => {
  const { theme, toggleTheme } = useTheme();

  const handleNotificationsClick = () => {
    // TODO: Implémenter l'ouverture des notifications
    console.log("2 notifications mockées");
  };

  return (
    <DropdownMenu
      trigger={(isOpen) => (
        <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-background-alt transition-colors cursor-pointer">
          <Avatar size="sm" />
          <ChevronDownIcon
            size={16}
            className={`text-text-light transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      )}
    >
      <div className="py-2">
        {/* Actions pour tablette (md:lg:) - masquées sur desktop */}
        <div className="lg:hidden pb-2 border-b border-border mb-2">
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
            <span>Theme</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleNotificationsClick}>
            <div className="relative">
              <BellIcon size={16} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full border-2 border-background-alt" />
            </div>
            <span>Notifications</span>
          </DropdownMenuItem>
        </div>
        {/* Menu utilisateur */}
        <DropdownMenuItem>
          <PersonIcon size={16} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon size={16} />
          <span>Settings</span>
        </DropdownMenuItem>
        <div className="border-t border-border mt-2 pt-2">
          <DropdownMenuItem>
            <PowerIcon size={16} />
            <span>Logout</span>
          </DropdownMenuItem>
        </div>
      </div>
    </DropdownMenu>
  );
};
