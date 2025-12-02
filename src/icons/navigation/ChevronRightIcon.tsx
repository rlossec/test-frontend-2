import { Icon } from "../Icon";

export const ChevronRightIcon = ({ className = "", ...props }) => (
  <Icon className={className} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </Icon>
);
