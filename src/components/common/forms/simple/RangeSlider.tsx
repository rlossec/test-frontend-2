import React, { useRef, useState } from "react";

type Mark = {
  value: number;
  label: string;
};

type RangeSliderProps = {
  value: [number, number];
  onChange: (value: [number, number]) => void;
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

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value: [minValue, maxValue],
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
  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
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

    // Détermine quel thumb déplacer en fonction de la distance
    const distanceToMin = Math.abs(newValue - minValue);
    const distanceToMax = Math.abs(newValue - maxValue);

    if (distanceToMin < distanceToMax) {
      setActiveThumb("min");
      // Empêche la valeur min de dépasser la valeur max
      onChange([Math.min(newValue, maxValue), maxValue]);
    } else {
      setActiveThumb("max");
      // Empêche la valeur max de descendre sous la valeur min
      onChange([minValue, Math.max(newValue, minValue)]);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!activeThumb || disabled || !trackRef.current) return;

    const newValue = getValueFromPosition(
      event.clientX,
      trackRef.current.getBoundingClientRect(),
      min,
      max,
      step
    );

    if (activeThumb === "min") {
      // Empêche la valeur min de dépasser la valeur max
      onChange([Math.min(newValue, maxValue), maxValue]);
    } else {
      // Empêche la valeur max de descendre sous la valeur min
      onChange([minValue, Math.max(newValue, minValue)]);
    }
  };

  const handleMouseUp = () => {
    setActiveThumb(null);
  };

  React.useEffect(() => {
    if (activeThumb) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeThumb]);

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

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
            if (!activeThumb && trackRef.current) {
              const rect = trackRef.current.getBoundingClientRect();
              setHoveredValue(
                getValueFromPosition(e.clientX, rect, min, max, step)
              );
            }
          }}
          onMouseLeave={() => !activeThumb && setHoveredValue(null)}
        >
          {/* Active track */}
          <div
            className={`absolute top-0 h-full bg-${trackColor}`}
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
              borderRadius: minPercent === maxPercent ? "9999px" : undefined,
            }}
          />

          {/* Thumbs */}
          <div
            className={`
              absolute top-1/2 h-4 w-4 rounded-full bg-background border-2 
              border-${trackColor} shadow-md transition-transform
              ${disabled ? "cursor-not-allowed" : "cursor-grab hover:scale-110"}
              ${activeThumb === "min" ? "cursor-grabbing scale-110 z-10" : ""}
            `}
            style={{
              left: `${minPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setActiveThumb("min");
            }}
          />
          <div
            className={`
              absolute top-1/2 h-4 w-4 rounded-full bg-background border-2 
              border-${trackColor} shadow-md transition-transform
              ${disabled ? "cursor-not-allowed" : "cursor-grab hover:scale-110"}
              ${activeThumb === "max" ? "cursor-grabbing scale-110 z-10" : ""}
            `}
            style={{
              left: `${maxPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setActiveThumb("max");
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
        {showTooltip && hoveredValue !== null && !activeThumb && (
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
          <span>{minValue}</span>
          <span>{maxValue}</span>
        </div>
      )}
    </div>
  );
};
