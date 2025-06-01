import styles from "./styles.module.scss";

import { FC, ReactNode } from "react";
import cn from "classnames";

interface IPaperProps {
  children?: ReactNode;
  className?: string;
}

export const Paper: FC<IPaperProps> = ({ children, className }) => {
  return <div className={cn(styles.paper, className)}>{children}</div>;
};
