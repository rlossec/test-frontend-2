import { Icon } from "../Icon";

export function PauseCircleIcon({ className = "", ...props }) {
  return (
    <Icon className={className} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Icon>
  );
}