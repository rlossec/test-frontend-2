export const Paper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`p-4 bg-background rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};
