import RadioButton from "./RadioButton";

const Form = () => {
  return (
    <form class="box">
      <fieldset class="percent">
        <legend>Select Tip %</legend>
        <div class="grid">
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
        </div>
      </fieldset>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default Form;
