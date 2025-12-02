import { Icon } from "../Icon";

export const SearchIcon = ({ className = "", ...props }) => (
  <Icon className={className} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </Icon>
);
