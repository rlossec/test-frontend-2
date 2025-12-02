import { Icon } from "../Icon";

export const XIcon = ({ className = "", ...props }) => (
  <Icon className={className} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </Icon>
);
