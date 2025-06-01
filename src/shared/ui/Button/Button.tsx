import styles from "./styles.module.scss";
import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "main" | "outlined" | "accent";
  className?: string;
  disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  variant = "main",
  disabled = false,
  isLoading = false,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        styles.button,
        styles[`button_${variant}`],
        {
          [styles.disabled]: disabled,
          [styles.loading]: isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
    >
      {isLoading && <div className={styles.loader} />}
      <span className={styles.content}>{children}</span>
      <span className={styles.glow} />
    </button>
  );
};
