import type { ReactNode } from "react";

type SectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function Section({ eyebrow, title, children, actions }: SectionProps) {
  return (
    <section className="route-panel">
      <div className="section-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="section-body">{children}</div>
      </div>
      {actions ? <div className="section-actions">{actions}</div> : null}
    </section>
  );
}
