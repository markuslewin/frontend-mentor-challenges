import { currentUser, comments } from "./data/data.json";

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
          <form className="bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:shape-p-6">
            <label>
              <span className="sr-only">Add a comment </span>
              <textarea
                className="resize-none rounded-lg shape-py-3 shape-px-6 shape-border-[1px] border-light-gray text-dark-blue placeholder:text-grayish-blue hocus:border-moderate-blue transition-colors"
                name="content"
                placeholder="Add a comment…"
                aria-describedby="commenting-as"
              ></textarea>
            </label>
            <p id="commenting-as">
              <span className="sr-only">Commenting as </span>
              <Avatar
                className="tablet:size-10"
                alt={currentUser.username}
                image={currentUser.image}
              />
            </p>
            <button
              className="font-medium uppercase rounded-lg shape-py-3 shape-px-8 shape-border-[1px] border-transparent bg-moderate-blue text-white hocus:bg-light-grayish-blue transition-colors"
              type="submit"
            >
              Send
            </button>
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
      <div className="bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:shape-p-6">
        <footer>
          <Avatar alt="" image={comment.user.image} />
          <p className="text-heading-m text-dark-blue">
            {comment.user.username}
          </p>
          <p>{comment.createdAt}</p>
        </footer>
        <p>{comment.content}</p>
        <Score id={comment.id} score={comment.score} />
        <Mutate id={comment.id} />
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
    <article className="bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:shape-p-6">
      <footer>
        <Avatar alt="" image={reply.user.image} />
        <p>{reply.user.username}</p>
        <p>{reply.createdAt}</p>
      </footer>
      <p>
        <b className="font-medium text-moderate-blue">@{reply.replyingTo}</b>{" "}
        {reply.content}
      </p>
      <Score id={reply.id} score={reply.score} />
      <Mutate id={reply.id} />
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
    <div className="font-medium rounded-[0.625rem] bg-very-light-gray text-moderate-blue">
      <p>
        {score}
        <span className="sr-only"> points</span>
      </p>
      <ul role="list">
        <li>
          <form>
            <input type="hidden" name="intent" value="upvote-message" />
            <input type="hidden" name="id" value={id} />
            <button type="submit">
              <img alt="Upvote" src="/images/icon-plus.svg" />
            </button>
          </form>
        </li>
        <li>
          <form>
            <input type="hidden" name="intent" value="downvote-message" />
            <input type="hidden" name="id" value={id} />
            <button type="submit">
              <img alt="Downvote" src="/images/icon-minus.svg" />
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
}

function Mutate({ id }: { id: number }) {
  return (
    <ul role="list">
      <li>
        <form>
          <input type="hidden" name="intent" value="delete-message" />
          <input type="hidden" name="id" value={id} />
          <button
            className="font-medium text-soft-red hocus:text-pale-red transition-colors"
            type="submit"
          >
            <img alt="" src="/images/icon-delete.svg" /> Delete
          </button>
        </form>
      </li>
      <li>
        <form>
          <input type="hidden" name="intent" value="edit-message" />
          <input type="hidden" name="id" value={id} />
          <button
            className="font-medium text-moderate-blue hocus:text-light-grayish-blue transition-colors"
            type="submit"
          >
            <img alt="" src="/images/icon-edit.svg" /> Edit
          </button>
        </form>
      </li>
    </ul>
  );
}

export default App;
