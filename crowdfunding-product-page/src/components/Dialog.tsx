import * as DialogPrimitive from "@radix-ui/react-dialog";
import rewards from "../data/rewards.json";

const pledges: (
  | { type: "none"; id: string; name: string; description: string }
  | {
      type: "item";
      id: string;
      name: string;
      description: string;
      min: number;
      left: number;
    }
)[] = [
  {
    type: "none",
    id: "none",
    name: "Pledge with no reward",
    description:
      "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.",
  },
  ...rewards.map((reward) => {
    return {
      type: "item" as const,
      id: reward.id,
      name: reward.name,
      description: reward.description,
      min: reward.min,
      left: reward.left,
    };
  }),
];

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PledgeDialogTrigger = (props: Props) => (
  <DialogPrimitive.Root>
    <DialogPrimitive.Trigger {...props} />
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog__overlay" />
      <DialogPrimitive.Content className="dialog__content card">
        <DialogPrimitive.Title>Back this project</DialogPrimitive.Title>
        <DialogPrimitive.Description className="mt-4">
          Want to support us in bringing Mastercraft Bamboo Monitor Riser out in
          the world?
        </DialogPrimitive.Description>
        <form className="mt-8" method="post">
          <fieldset>
            <legend className="sr-only">Select a reward</legend>
            <ul className="dialog__pledges">
              {pledges.map((pledge) => {
                const descId = `pledge-${pledge.id}-desc`;
                const quantityId = `pledge-${pledge.id}-quantity`;
                const disabled = pledge.type === "item" && !pledge.left;
                return (
                  <li
                    className="card mt-6"
                    key={pledge.id}
                    data-disabled={disabled}
                  >
                    <div>
                      <h3>
                        <button
                          type="submit"
                          name="pledge"
                          value={pledge.id}
                          disabled={disabled}
                          aria-describedby={descId}
                        >
                          {pledge.name}
                        </button>
                      </h3>
                      {pledge.type === "item" ? (
                        <p>Pledge ${pledge.min} or more</p>
                      ) : null}
                      <p id={descId}>{pledge.description}</p>
                      {pledge.type === "item" ? (
                        <p>
                          <strong>{pledge.left}</strong> left
                        </p>
                      ) : null}
                    </div>
                    <label htmlFor={quantityId}>Enter your pledge</label>
                    <span>
                      <span>$</span>
                      <input
                        type="number"
                        name="quantity"
                        defaultValue={pledge.type === "item" ? pledge.min : 0}
                        min={pledge.type === "item" ? pledge.min : 0}
                        id={quantityId}
                      />
                    </span>
                    <button type="submit" name="intent" value="pledge">
                      Continue
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </form>
        <DialogPrimitive.Close className="dialog__close">
          <img alt="Close" src="/images/icon-close-modal.svg" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);
