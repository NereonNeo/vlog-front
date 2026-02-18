import type { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function Card({ children, className, as: Component = "div" }: CardProps) {
  return <Component className={clsx("surface glow-border", className)}>{children}</Component>;
}
