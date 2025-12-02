import { Icon } from "../Icon";



export const PauseIcon = ({ className = "", ...props }) => (
  <Icon className={className} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
    />
  </Icon>
);
