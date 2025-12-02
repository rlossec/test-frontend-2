import React from "react";

import { PersonIcon } from "../../../icons/user-interface/PersonIcon";

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 48,
  className = "",
  onClick,
}) => {
  return (
    <div className={`relative inline-block ${className}`} onClick={onClick}>
      <div
        className={`
          rounded-full overflow-hidden flex items-center justify-center
          ${onClick ? "cursor-pointer hover:opacity-90" : ""}
          bg-background-alt
        `}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            style={{ width: size, height: size }}
          />
        ) : (
          <PersonIcon
            className={`w-full h-full p-6 rounded-full text-text bg-background-alt`}
          />
        )}
      </div>
    </div>
  );
};
