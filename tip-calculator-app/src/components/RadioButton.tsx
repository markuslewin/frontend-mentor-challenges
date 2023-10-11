import type { ComponentChildren } from "preact";
import { useId } from "preact/hooks";

const RadioButton = ({
  name,
  value,
  children,
}: {
  name: string;
  value: string;
  children?: ComponentChildren;
}) => {
  const id = useId();

  return (
    <>
      <input id={id} type="radio" name={name} value={value} />
      <label for={id}>{children}</label>
    </>
  );
};

export default RadioButton;
