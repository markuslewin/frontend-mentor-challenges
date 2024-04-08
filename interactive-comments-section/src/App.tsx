import { currentUser, comments } from "./data/data.json";
import spriteUrl from "./images/sprite.svg";

function App() {
  return (
    <main className="min-h-screen px-4 py-8 tablet:p-16">
      <div className="max-w-[45.625rem] box-content mx-auto">
        <h1 className="sr-only">Interactive comments section</h1>
        <div className="grid gap-4 tablet:gap-5">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <section
          className="mt-4 tablet:mt-5"
          aria-labelledby="add-comment-label"
        >
          <h2 className="sr-only" id="add-comment-label">
            Add a comment
          </h2>
          <form className="grid grid-cols-[max-content_1fr] items-center gap-4 bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:grid-cols-[max-content_1fr_max-content] tablet:items-start tablet:shape-p-6">
            <label className="col-span-full tablet:col-start-2 tablet:col-span-1">
              <span className="sr-only">Add a comment </span>
              <textarea
                className="h-24 w-full resize-none rounded-lg shape-py-3 shape-px-6 shape-border-[1px] border-light-gray text-dark-blue placeholder:text-grayish-blue hocus:border-moderate-blue transition-colors"
                name="content"
                placeholder="Add a comment…"
                aria-describedby="commenting-as"
              ></textarea>
            </label>
            <p
              className="row-start-2 tablet:col-start-1 tablet:row-start-1"
              id="commenting-as"
            >
              <span className="sr-only">Commenting as </span>
              <Avatar
                className="tablet:size-10"
                alt={currentUser.username}
                image={currentUser.image}
              />
            </p>
            <p className="row-start-2 grid justify-end tablet:col-start-3 tablet:row-start-1">
              <button
                className="font-medium uppercase rounded-lg shape-py-3 shape-px-8 shape-border-[1px] border-transparent bg-moderate-blue text-white hocus:bg-light-grayish-blue transition-colors"
                type="submit"
              >
                Send
              </button>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

type Comment = (typeof comments)[number];

function Comment({ comment }: { comment: Comment }) {
  return (
    <article>
      <div className="message-layout bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:shape-p-6">
        <footer className="message-layout__footer flex items-center gap-y-1 gap-x-4 flex-wrap">
          <Avatar alt="" image={comment.user.image} />
          <div className="flex items-baseline gap-y-1 gap-x-4 flex-wrap">
            <p className="text-heading-m text-dark-blue">
              {comment.user.username}
            </p>
            <p>{comment.createdAt}</p>
          </div>
        </footer>
        <p className="message-layout__content">{comment.content}</p>
        <div className="message-layout__score">
          <Score id={comment.id} score={comment.score} />
        </div>
        <div className="message-layout__mutate">
          <Mutate id={comment.id} />
        </div>
      </div>
      {comment.replies.length ? (
        <div className="mt-4 grid grid-cols-[2px_1fr] gap-4 tablet:mt-5 tablet:grid-cols-[5.5rem_1fr] tablet:justify-items-center tablet:gap-y-5 tablet:gap-x-0">
          <div className="border-l-2 text-light-gray"></div>
          <div className="grid gap-4 tablet:gap-5">
            {comment.replies.map((reply) => (
              <Reply key={reply.id} reply={reply} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

type Reply = Comment["replies"][number];

function Reply({ reply }: { reply: Reply }) {
  return (
    <article className="message-layout bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:shape-p-6">
      <footer className="message-layout__footer flex items-center gap-y-1 gap-x-4 flex-wrap">
        <Avatar alt="" image={reply.user.image} />
        <div className="flex items-baseline gap-y-1 gap-x-4 flex-wrap">
          <p className="text-heading-m text-dark-blue">{reply.user.username}</p>
          <p>{reply.createdAt}</p>
        </div>
      </footer>
      <p className="message-layout__content">
        <b className="font-medium text-moderate-blue">@{reply.replyingTo}</b>{" "}
        {reply.content}
      </p>
      <div className="message-layout__score">
        <Score id={reply.id} score={reply.score} />
      </div>
      <div className="message-layout__mutate">
        <Mutate id={reply.id} />
      </div>
    </article>
  );
}

function Avatar({
  className,
  alt,
  image,
}: {
  className?: string;
  alt: string;
  image: {
    webp: string;
    png: string;
  };
}) {
  return (
    <picture>
      <source type="image/webp" srcSet={image.webp} />
      <img
        className={`size-8 rounded-full ${className}`}
        alt={alt}
        width={64}
        height={64}
        src={image.png}
      />
    </picture>
  );
}

function Score({ id, score }: { id: number; score: number }) {
  return (
    <div className="h-10 min-w-[6.25rem] px-3 border-[1px] border-transparent grid grid-cols-[max-content_1fr_max-content] items-center text-center font-medium rounded-[0.625rem] bg-very-light-gray text-moderate-blue tablet:h-[6.25rem] tablet:px-0 tablet:min-w-10 tablet:grid-cols-none">
      <form>
        <input type="hidden" name="intent" value="upvote-message" />
        <input type="hidden" name="id" value={id} />
        <button
          className="text-light-grayish-blue hocus:text-moderate-blue transition-colors"
          type="submit"
        >
          <Icon className="size-[0.625rem]" name="plus" />
          <span className="sr-only">Upvote</span>
        </button>
      </form>
      <p>
        {score}
        <span className="sr-only"> points</span>
      </p>
      <form>
        <input type="hidden" name="intent" value="downvote-message" />
        <input type="hidden" name="id" value={id} />
        <button
          className="text-light-grayish-blue hocus:text-moderate-blue transition-colors"
          type="submit"
        >
          <Icon className="size-[0.625rem]" name="minus" />
          <span className="sr-only">Downvote</span>
        </button>
      </form>
    </div>
  );
}

function Mutate({ id }: { id: number }) {
  return (
    <ul
      className="flex flex-wrap justify-end gap-y-1 gap-x-4 tablet:gap-y-1 tablet:gap-x-6"
      role="list"
    >
      <li>
        <form>
          <input type="hidden" name="intent" value="delete-message" />
          <input type="hidden" name="id" value={id} />
          <button
            className="grid grid-cols-[max-content_1fr] gap-2 items-baseline font-medium text-soft-red hocus:text-pale-red transition-colors"
            type="submit"
          >
            <Icon className="size-[0.875rem]" name="delete" /> Delete
          </button>
        </form>
      </li>
      <li>
        <form>
          <input type="hidden" name="intent" value="edit-message" />
          <input type="hidden" name="id" value={id} />
          <button
            className="grid grid-cols-[max-content_1fr] gap-2 items-baseline font-medium text-moderate-blue hocus:text-light-grayish-blue transition-colors"
            type="submit"
          >
            <Icon className="size-[0.875rem]" name="edit" /> Edit
          </button>
        </form>
      </li>
    </ul>
  );
}

function Icon({
  name,
  className,
  ...props
}: {
  className?: string;
  name: "delete" | "edit" | "minus" | "plus" | "reply";
} & React.SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`forced-color-adjust-auto ${className}`}
      {...props}
    >
      <use href={`${spriteUrl}#${name}`} />
    </svg>
  );
}

export default App;
