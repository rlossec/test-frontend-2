import { useState, useRef, useEffect } from "react";

export const DropdownMenu = ({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // fermer si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-background border border-border shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
};
