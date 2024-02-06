import * as DialogPrimitive from "@radix-ui/react-dialog";
import rewards from "../data/rewards.json";
import { useState, type SyntheticEvent } from "react";

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

export const PledgeDialogTrigger = (props: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger {...props} />
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="dialog__overlay" />
        <DialogPrimitive.Content className="dialog__content card">
          <DialogPrimitive.Title>Back this project</DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-4">
            Want to support us in bringing Mastercraft Bamboo Monitor Riser out
            in the world?
          </DialogPrimitive.Description>
          <form
            className="mt-6 tablet:mt-8"
            method="post"
            onSubmit={(e) => {
              if (!(e.nativeEvent instanceof SubmitEvent)) {
                return;
              }
              const formData = new FormData(
                e.currentTarget,
                e.nativeEvent.submitter
              );
              const pledgeId = formData.get("pledge");
              if (typeof pledgeId !== "string") {
                return;
              }
              setSelected(pledgeId);
              e.preventDefault();
            }}
          >
            <fieldset>
              <legend className="sr-only">Select a reward</legend>
              <ul className="dialog__pledges" role="list">
                {pledges.map((pledge) => {
                  const descId = `pledge-${pledge.id}-desc`;
                  const quantityId = `pledge-${pledge.id}-quantity`;
                  const disabled = pledge.type === "item" && !pledge.left;
                  return (
                    <li
                      className="[ pledge ] [ card first:mt-0 mt-6 ]"
                      key={pledge.id}
                      data-disabled={disabled}
                      data-selected={selected === pledge.id}
                    >
                      <div className="pledge__upper">
                        <div className="pledge__radio"></div>
                        <div className="pledge__heading">
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
                        </div>
                        <p className="pledge__desc" id={descId}>
                          {pledge.description}
                        </p>
                        {pledge.type === "item" ? (
                          <p className="pledge__left">
                            <strong>{pledge.left}</strong> left
                          </p>
                        ) : null}
                      </div>
                      <div className="[ pledge__enter ] [ mt-6 tablet:mt-8 ]">
                        <label htmlFor={quantityId}>Enter your pledge</label>
                        <div>
                          <span>
                            <span>$</span>
                            <input
                              className="w-[6.25rem]"
                              type="number"
                              name="quantity"
                              defaultValue={
                                pledge.type === "item" ? pledge.min : 0
                              }
                              min={pledge.type === "item" ? pledge.min : 0}
                              id={quantityId}
                            />
                          </span>
                          <button type="submit" name="intent" value="pledge">
                            Continue
                          </button>
                        </div>
                      </div>
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
};
