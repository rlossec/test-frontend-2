export const Loader = ({size = 20}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`w-${size} h-${size} rounded-full bg-indigo-400 animate-bounce`}></div>
      <div className={`w-${size} h-${size} rounded-full bg-purple-500 animate-bounce delay-150`}></div>
      <div className={`w-${size} h-${size} rounded-full bg-pink-500 animate-bounce delay-300`}></div>
    </div>
  );
};
