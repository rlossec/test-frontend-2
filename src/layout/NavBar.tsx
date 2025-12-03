import { NavLink } from "react-router-dom";

interface NavBarProps {
  className?: string;
}

export const NavBar = ({ className = "" }: NavBarProps) => {
  const baseClass = "text-text-light hover:text-text transition-colors";
  const activeClass = "text-primary font-semibold";

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/tools", label: "Tools" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <nav className={`flex md:flex-row flex-col gap-8 ${className}`}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass}` : baseClass
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
