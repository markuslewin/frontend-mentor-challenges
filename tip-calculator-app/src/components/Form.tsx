import { useEffect, useState } from "preact/hooks";
import RadioButton from "./RadioButton";

interface Props {
  class?: string;
}

const Form = ({ class: className }: Props) => {
  const [percent, setPercent] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <form class={className}>
      <fieldset
        class="percent"
        data-variant={isClient ? "custom field" : "custom button"}
      >
        <legend>Select Tip %</legend>
        <div class="[ percent__options ] [ grid ]">
          {[5, 10, 15, 25, 50].map((_percent) => {
            return (
              <RadioButton
                name="percent"
                value={_percent.toString()}
                checked={percent === _percent}
                onClick={() => {
                  setPercent(_percent);
                }}
              >
                {_percent}%
              </RadioButton>
            );
          })}
          <div class="[ percent__custom-container radio-button ] [ grid ]">
            <input
              class="[ percent__custom-radio ] [ sr-only ]"
              id="percent-custom"
              type="radio"
              name="percent"
              value="custom"
            />
            <label
              class="[ percent__custom-button ] [ shape ]"
              for="percent-custom"
            >
              Custom
            </label>
            <label
              class="[ percent__custom-field-label ] [ sr-only ]"
              for="percent-custom-value"
            >
              Custom percent
            </label>
            <input
              class="[ percent__custom-field field ]"
              id="percent-custom-value"
              type="text"
              name="percent-custom"
              placeholder="Custom"
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement && e.target.value) {
                  setPercent(null);
                }
              }}
            />
          </div>
        </div>
      </fieldset>
      <button class="sr-only" type="submit">
        Calculate
      </button>
    </form>
  );
};

export default Form;
