import { SearchIcon } from "../../icons/actions/SearchIcon";

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className = "" }: SearchBarProps) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="absolute left-3 pointer-events-none">
        <SearchIcon className="text-text-light/60" size={20} />
      </div>
      <input
        type="text"
        placeholder="Search tools ..."
        className="w-full md:w-48 pl-10 pr-4 py-2 bg-background-alt border border-border rounded-lg text-text placeholder:text-text-light/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  );
};
