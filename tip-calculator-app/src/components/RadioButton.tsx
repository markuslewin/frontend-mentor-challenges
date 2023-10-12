import type { ComponentChildren } from "preact";
import { useId } from "preact/hooks";

interface Props {
  name: string;
  value: string;
  checked?: boolean;
  onClick?(): void;
  children?: ComponentChildren;
}

const RadioButton = ({ name, value, checked, onClick, children }: Props) => {
  const id = useId();

  return (
    <div class="radio-button">
      <input
        class="sr-only"
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onClick={onClick}
      />
      <label class="shape" for={id}>
        {children}
      </label>
    </div>
  );
};

export default RadioButton;
