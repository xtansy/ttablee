import styles from "./styles.module.scss";

import { FC, useEffect } from "react";
import ReactDOM from "react-dom";

type IModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
};

export const Modal: FC<IModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <div className={styles.header}>{title}</div>}
        <div className={styles.content}>{children}</div>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
      </div>
    </div>,
    document.body
  );
};
