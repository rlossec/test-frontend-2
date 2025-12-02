type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => (
  <textarea
    className={`w-full px-3 py-2 border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${className || ''}`}
    {...props}
  />
);
