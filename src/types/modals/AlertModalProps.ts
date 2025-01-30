export interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  success: boolean;
  message: string;
  redirectPath?: string;
}