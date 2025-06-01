import styles from "./styles.module.scss";
import { FC, ReactNode } from "react";
import cn from "classnames";

interface IButtonProps {
  children?: ReactNode;
  isLoading?: boolean;
  variant?: "main" | "outlined" | "accent";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  variant = "main",
  disabled = false,
  isLoading = false,
  onClick,
}) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button_${variant}`],
        {
          [styles.disabled]: disabled,
          [styles.loading]: isLoading,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <div className={styles.loader} />}
      <span className={styles.content}>{children}</span>
      <span className={styles.glow} />
    </button>
  );
};
