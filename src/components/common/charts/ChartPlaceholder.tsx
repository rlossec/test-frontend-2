import { ChartIcon } from "../../../icons/state/ChartIcon";

interface ChartPlaceholderProps {
  title: string;
  content: string;
}

export const ChartPlaceholder = ({ title, content }: ChartPlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <ChartIcon className="w-12 h-12 text-text-light/30 mb-4" />
      <p className="text-sm text-text-light/60 text-center">{title}</p>
      <p className="text-xs text-text-light/40 text-center mt-2">{content}</p>
    </div>
  );
};
