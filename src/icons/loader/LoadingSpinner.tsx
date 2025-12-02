import { Icon } from "../Icon";


export const LoadingSpinner = ({
  className = "animate-spin -ml-1 mr-3 h-5 w-5",
  ...props
}) => (
  <Icon className={className} {...props}>
    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </Icon>
);
