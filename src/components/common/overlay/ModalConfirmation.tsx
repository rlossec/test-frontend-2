import { Modal } from "./Modal";
import { Button } from "../base/buttons/Button";

interface ModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "primary" | "success" | "warning" | "error" | "default";
  isLoading?: boolean;
}

export const ModalConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmColor = "error",
  isLoading = false,
}: ModalConfirmationProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      closeOnClickOutside={!isLoading}
      closeOnEsc={!isLoading}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            color={confirmColor}
            variant="solid"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </Button>
        </div>
      }
    >
      <p className="text-text-light">{message}</p>
    </Modal>
  );
};
