const Form = () => {
  return (
    <form>
      <fieldset>
        <legend>Select Tip %</legend>
        {[5, 10, 15, 25, 50].map((percent) => {
          const id = `percent-${percent}`;
          return (
            <>
              <input id={id} type="radio" name="percent" value={percent} />
              <label for={id}>{percent}%</label>
            </>
          );
        })}
        <input id="percent-custom" type="radio" name="percent" value="custom" />
        <label for="percent-custom">Custom</label>
        <input type="number" name="percent-custom-value" placeholder="Custom" />
      </fieldset>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default Form;
