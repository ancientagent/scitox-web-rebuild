import type { ReactNode } from "react";

type StatusTagProps = {
  children: ReactNode;
  tone?: "owner" | "review" | "placeholder";
};

export function StatusTag({ children, tone = "placeholder" }: StatusTagProps) {
  return <span className={`status-tag status-tag--${tone}`}>{children}</span>;
}
