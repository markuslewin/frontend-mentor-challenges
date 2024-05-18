import {
  InputHTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useId,
} from "react";

const context = createContext<{ descriptionId: string } | null>(null);

function useRadioCardContext() {
  const value = useContext(context);
  if (value === null)
    throw new Error("useRadioCardContext must be used inside a RadioCard");

  return value;
}

export function Root({ children }: { children: ReactNode }) {
  const descriptionId = useId();

  return (
    <context.Provider value={{ descriptionId }}>
      <div>{children}</div>
    </context.Provider>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <label>{children}</label>;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { descriptionId } = useRadioCardContext();

  return <input type="radio" aria-describedby={descriptionId} {...props} />;
}

export function Description({ children }: { children: ReactNode }) {
  const { descriptionId } = useRadioCardContext();

  return <p id={descriptionId}>{children}</p>;
}
