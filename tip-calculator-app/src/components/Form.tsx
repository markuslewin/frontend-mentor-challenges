import RadioButton from "./RadioButton";

const Form = () => {
  return (
    <form>
      <fieldset>
        <legend>Select Tip %</legend>
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
        <input type="number" name="percent-custom" placeholder="Custom" />
      </fieldset>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default Form;
