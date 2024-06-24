import { useAnnouncer } from "#app/components/announcer/use-announcer.js";
import { Icon } from "#app/components/icon";
import { invariant } from "@epic-web/invariant";
import { useQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import { z } from "zod";

const quotesSchema = z
  .array(
    z.object({
      content: z.string(),
      author: z.string(),
    }),
  )
  .nonempty();

type Quotes = z.infer<typeof quotesSchema>;
type Quote = Quotes[number];

function useQuote() {
  return useQuery({
    queryKey: ["quote"],
    async queryFn() {
      const response = await fetch("https://api.quotable.io/quotes/random");
      invariant(response.ok, `Unsuccessful status code: ${response.status}`);

      const json = await response.json();
      const [quote] = quotesSchema.parse(json);

      return quote;
    },
    staleTime: Infinity,
    initialData: {
      content:
        "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.",
      author: "Ada Lovelace",
    } satisfies Quote,
  });
}

export function Quote() {
  const { announce } = useAnnouncer();
  const quote = useQuote();

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 overflow-hidden">
      <blockquote aria-live="assertive">
        <p>“{quote.data.content}”</p>
        <footer className="mt-2 tablet:mt-3">
          <p className="text-h5">{quote.data.author}</p>
        </footer>
      </blockquote>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          quote.refetch();
          announce("Loading a new quote.");
        }}
      >
        <button
          className={cx(
            "text-white/50 transition-colors clickable-12 hocus:text-white",
            quote.isFetching ? "animate-spin" : "",
          )}
          onClick={(e) => {
            if (quote.isFetching) {
              e.preventDefault();
            }
          }}
          aria-disabled={quote.isFetching}
        >
          <Icon
            className="h-[1.125rem] w-auto"
            name="icon-refresh"
            width="18"
            height="18"
          />
          <span className="sr-only">Get a new quote</span>
        </button>
      </form>
    </div>
  );
}
