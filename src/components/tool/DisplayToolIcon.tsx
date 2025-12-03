import { useState } from "react";
import { WrenchIcon } from "../../icons/others/WrenchIcon";

export const DisplayToolIcon = ({
  iconUrl,
  toolName,
}: {
  iconUrl?: string;
  toolName: string;
}) => {
  const [imageError, setImageError] = useState(false);

  // Si pas d'URL ou erreur de chargement, afficher WrenchIcon
  if (!iconUrl || imageError) {
    return <WrenchIcon className="w-6 h-6 text-text-light" />;
  }

  return (
    <img
      src={iconUrl}
      alt={`${toolName} icon`}
      className="w-6 h-6 object-contain"
      onError={() => setImageError(true)}
    />
  );
};
