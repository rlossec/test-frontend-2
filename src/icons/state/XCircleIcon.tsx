import { Icon } from "../Icon";

export const XCircleIcon = ({ className = "", ...props }) => (
  <Icon className={className} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </Icon>
);
