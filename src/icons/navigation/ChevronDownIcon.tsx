import { Icon } from "../Icon";



export const ChevronDownIcon = ({ className = "", ...props }) => (
  <Icon className={className} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </Icon>
);
