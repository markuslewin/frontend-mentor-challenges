import * as DialogPrimitive from "@radix-ui/react-dialog";
import rewards from "../data/rewards.json";
import { useState } from "react";
import { fetcher } from "../utils/fetcher";

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

function usePledge() {
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "pending" }
    | { status: "success"; data: unknown }
    | { status: "error"; error: unknown }
  >({
    status: "idle",
  });

  return {
    isIdle: state.status === "idle",
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    data: state.status === "success" ? state.data : undefined,
    error: state.status === "error" ? state.error : undefined,
    async mutate(formData: FormData) {
      try {
        setState({ status: "pending" });
        const response = await fetcher.fetch("/pledge", {
          method: "post",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Response not successful");
        }
        const data = await response.json();
        setState({ status: "success", data });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          // Keep the pending state of the current fetch.
          return;
        }
        setState({ status: "error", error });
      }
    },
  };
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PledgeDialogTrigger = (props: Props) => {
  const mutation = usePledge();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (mutation.isPending) {
          return;
        }
        setOpen(nextOpen);
      }}
    >
      <DialogPrimitive.Trigger {...props} />
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="dialog__overlay" />
        <DialogPrimitive.Content className="dialog__content card">
          <DialogPrimitive.Title className="dialog__heading">
            Back this project
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-4">
            Want to support us in bringing Mastercraft Bamboo Monitor Riser out
            in the world?
          </DialogPrimitive.Description>
          <div className="mt-6 tablet:mt-8">
            <fieldset
              className="disabled:opacity-50"
              disabled={mutation.isPending}
            >
              <legend className="sr-only">Select a reward</legend>
              <ul className="dialog__pledges" role="list">
                {pledges.map((pledge) => {
                  const descId = `pledge-${pledge.id}-desc`;
                  const amountId = `pledge-${pledge.id}-amount`;
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
                          <form
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
                          </form>
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
                      <form
                        className="[ pledge__enter ] [ mt-6 tablet:mt-8 ]"
                        method="post"
                        onSubmit={(e) => {
                          const formData = new FormData(e.currentTarget);
                          formData.set("id", pledge.id);
                          mutation.mutate(formData).then(() => {
                            setOpen(false);
                            dispatchEvent(new Event("success"));
                          });
                          e.preventDefault();
                        }}
                      >
                        <label htmlFor={amountId}>
                          Enter your pledge
                          <span className="sr-only"> in dollars</span>
                        </label>
                        <div className="flex flex-wrap gap-4 justify-center mt-4 tablet:mt-0">
                          <span className="textbox">
                            <span className="textbox__sign" aria-hidden="true">
                              $
                            </span>
                            <input
                              className="textbox__input"
                              type="number"
                              name="amount"
                              defaultValue={
                                pledge.type === "item" ? pledge.min : 0
                              }
                              min={pledge.type === "item" ? pledge.min : 0}
                              id={amountId}
                            />
                          </span>
                          <button
                            className="button"
                            type="submit"
                            name="intent"
                            value="pledge"
                          >
                            Continue
                          </button>
                        </div>
                      </form>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </div>
          <DialogPrimitive.Close
            className="dialog__close"
            disabled={mutation.isPending}
          >
            <img alt="Close" src="/images/icon-close-modal.svg" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
