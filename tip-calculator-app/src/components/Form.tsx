import RadioButton from "./RadioButton";

interface Props {
  class?: string;
}

const Form = ({ class: className }: Props) => {
  return (
    <form class={className}>
      <fieldset class="percent">
        <legend>Select Tip %</legend>
        <div class="[ percent__options ] [ grid ]">
          {[5, 10, 15, 25, 50].map((percent) => {
            return (
              <RadioButton name="percent" value={percent.toString()}>
                {percent}%
              </RadioButton>
            );
          })}
          <RadioButton name="percent" value="custom">
            Custom
          </RadioButton>
          <input
            class="field"
            type="text"
            name="percent-custom"
            placeholder="Custom"
          />
        </div>
      </fieldset>
      <button class="sr-only" type="submit">
        Calculate
      </button>
    </form>
  );
};

export default Form;
