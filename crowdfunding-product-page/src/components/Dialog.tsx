import * as DialogPrimitive from "@radix-ui/react-dialog";
import rewards from "../data/rewards.json";

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
          <ul className="dialog__pledges">
            {/* todo: Merge into `rewards.map` */}
            <li className="card" data-selected="true">
              <h3>
                <button
                  type="submit"
                  name="reward"
                  value="none"
                  aria-describedby="reward-none-desc"
                >
                  Pledge with no reward
                </button>
              </h3>
              <div className="radio"></div>
              <p id="reward-none-desc">
                Choose to support us without a reward if you simply believe in
                our project. As a backer, you will be signed up to receive
                product updates via email.
              </p>
            </li>
            {rewards.map((reward) => {
              const descId = `reward-${reward.id}-desc`;
              const quantityId = `reward-${reward.id}-quantity`;
              const disabled = !reward.left;
              return (
                <li
                  className="card mt-6"
                  key={reward.id}
                  data-disabled={disabled}
                >
                  <div>
                    <h3>
                      <button
                        type="submit"
                        name="reward"
                        value={reward.id}
                        disabled={disabled}
                        aria-describedby={descId}
                      >
                        {reward.name}
                      </button>
                    </h3>
                    <p>Pledge ${reward.min} or more</p>
                    <p id={descId}>{reward.description}</p>
                    <p>
                      <strong>{reward.left}</strong> left
                    </p>
                  </div>
                  <label htmlFor={quantityId}>Enter your pledge</label>
                  <span>
                    <span>$</span>
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={reward.min}
                      min={reward.min}
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
        </form>
        <DialogPrimitive.Close className="dialog__close">
          <img alt="Close" src="/images/icon-close-modal.svg" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);
