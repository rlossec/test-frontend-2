import React, { useRef, useState } from "react";

type Mark = {
  value: number;
  label: string;
};

type BaseSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  disabled?: boolean;
  marks?: Mark[];
  label?: string;
  showTooltip?: boolean;
  className?: string;
  trackColor?: string;
};

type SliderProps = BaseSliderProps & {
  value: number;
  onChange: (value: number) => void;
};

const getValueFromPosition = (
  clientX: number,
  rect: DOMRect,
  min: number,
  max: number,
  step: number
) => {
  const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  return Math.round((percent * (max - min) + min) / step) * step;
};

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = false,
  disabled = false,
  marks = [],
  label,
  showTooltip = false,
  className = "",
  trackColor = "primary",
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleTrackMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return;

    const newValue = getValueFromPosition(
      event.clientX,
      trackRef.current.getBoundingClientRect(),
      min,
      max,
      step
    );
    onChange(newValue);
    setIsDragging(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || disabled || !trackRef.current) return;

    const newValue = getValueFromPosition(
      event.clientX,
      trackRef.current.getBoundingClientRect(),
      min,
      max,
      step
    );
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-light mb-1">
          {label}
        </label>
      )}

      <div className="relative px-2">
        {/* Track background */}
        <div
          ref={trackRef}
          className={`
            h-2 rounded-full bg-gray-300
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          onMouseDown={handleTrackMouseDown}
          onMouseMove={(e) => {
            if (!isDragging && trackRef.current) {
              const rect = trackRef.current.getBoundingClientRect();
              setHoveredValue(
                getValueFromPosition(e.clientX, rect, min, max, step)
              );
            }
          }}
          onMouseLeave={() => !isDragging && setHoveredValue(null)}
        >
          {/* Active track */}
          <div
            className={`absolute top-0 h-full rounded-full bg-${trackColor}`}
            style={{
              width: `${percent}%`,
            }}
          />

          {/* Thumb */}
          <div
            className={`
              absolute top-1/2 h-4 w-4 rounded-full bg-background border-2 
              border-${trackColor} shadow-md transition-transform
              ${disabled ? "cursor-not-allowed" : "cursor-grab hover:scale-110"}
              ${isDragging ? "cursor-grabbing scale-110" : ""}
            `}
            style={{
              left: `${percent}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Marks */}
        {marks.length > 0 && (
          <div className="absolute left-0 right-0 top-8">
            {marks.map((mark) => {
              const markPercent = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${markPercent}%` }}
                >
                  <div className="w-0.5 h-1.5 bg-border" />
                  <span className="mt-1 text-xs text-text-light whitespace-nowrap transform -translate-x-1/2">
                    {mark.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Tooltip */}
        {showTooltip && hoveredValue !== null && (
          <div
            className="absolute -top-8 transform -translate-x-1/2 px-2 py-1 bg-background text-text text-xs rounded"
            style={{
              left: `${((hoveredValue - min) / (max - min)) * 100}%`,
            }}
          >
            {hoveredValue}
          </div>
        )}
      </div>

      {showValue && (
        <div className="flex justify-between text-sm text-text-light mt-1">
          <span>{value}</span>
        </div>
      )}
    </div>
  );
};
