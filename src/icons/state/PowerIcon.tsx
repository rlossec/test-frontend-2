import { Icon } from "../Icon";


export const PowerIcon = ({ className = "", ...props }) => (
  <Icon className={className} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
    />
  </Icon>
);
