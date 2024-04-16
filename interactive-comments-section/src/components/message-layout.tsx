import { ReactNode } from "react";

export function Root({ children }: { children: ReactNode }) {
  return (
    <div className="message-layout bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:shape-p-6">
      {children}
    </div>
  );
}

export function Footer({ children }: { children: ReactNode }) {
  return <footer className="message-layout__footer">{children}</footer>;
}

export function Content({ children }: { children: ReactNode }) {
  return <div className="message-layout__content">{children}</div>;
}

export function Score({ children }: { children: ReactNode }) {
  return <div className="message-layout__score">{children}</div>;
}

export function Mutate({ children }: { children: ReactNode }) {
  return <div className="message-layout__mutate">{children}</div>;
}
