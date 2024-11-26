interface QuantitySelectProps {
  size: "small" | "large";
}

export function QuantitySelect({ size }: QuantitySelectProps) {
  return (
    <fieldset className="grid">
      <legend className="sr-only">Select quantity</legend>
      <input type="hidden" />
      <div
        className={[
          "inline-grid bg-F1F1F1 text-sub-title text-000000/25",
          size === "small" ? "h-8 min-w-24 grid-cols-[2rem_1fr_2rem]" : "",
          size === "large"
            ? "h-12 min-w-[7.5rem] grid-cols-[3rem_1fr_3rem]"
            : "",
        ].join(" ")}
      >
        <p className="self-center text-center text-000000" aria-live="polite">
          <span className="sr-only">Quantity: </span> 1
        </p>
        <button
          className="order-first transition-colors hocus:text-D87D4A"
          type="button"
        >
          <span aria-hidden="true">-</span>
          <span className="sr-only">Decrement quantity</span>
        </button>
        <button className="transition-colors hocus:text-D87D4A" type="button">
          <span aria-hidden="true">+</span>
          <span className="sr-only">Increment quantity</span>
        </button>
      </div>
    </fieldset>
  );
}
