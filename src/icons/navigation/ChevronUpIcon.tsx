import { Icon } from "../Icon";



export const ChevronUpIcon = ({ className = "", ...props }) => (
  <Icon className={className} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </Icon>
);
