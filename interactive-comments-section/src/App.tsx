import { currentUser, comments } from "./data/data.json";

function App() {
  return (
    <main>
      <h1>Interactive comments section</h1>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <section aria-labelledby="add-comment-label">
        <h2 id="add-comment-label">Add a comment</h2>
        <form>
          <label>
            Add a comment{" "}
            <textarea name="content" placeholder="Add a comment…"></textarea>
          </label>
          <p>
            Commenting as{" "}
            <Avatar alt={currentUser.username} image={currentUser.image} />
          </p>
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}

type Comment = (typeof comments)[number];

function Comment({ comment }: { comment: Comment }) {
  return (
    <article>
      <footer>
        <Avatar alt="" image={comment.user.image} />
        <p>{comment.user.username}</p>
        <p>{comment.createdAt}</p>
      </footer>
      <p>{comment.content}</p>
      <Score id={comment.id} score={comment.score} />
      <Mutate id={comment.id} />
      {comment.replies.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </article>
  );
}

type Reply = Comment["replies"][number];

function Reply({ reply }: { reply: Reply }) {
  return (
    <article>
      <footer>
        <Avatar alt="" image={reply.user.image} />
        <p>{reply.user.username}</p>
        <p>{reply.createdAt}</p>
      </footer>
      <p>
        <b>@{reply.replyingTo}</b> {reply.content}
      </p>
      <Score id={reply.id} score={reply.score} />
      <Mutate id={reply.id} />
    </article>
  );
}

function Avatar({
  alt,
  image,
}: {
  alt: string;
  image: {
    webp: string;
    png: string;
  };
}) {
  return (
    <picture>
      <source type="image/webp" srcSet={image.webp} />
      <img alt={alt} width={64} height={64} src={image.png} />
    </picture>
  );
}

function Score({ id, score }: { id: number; score: number }) {
  return (
    <>
      <p>{score} points</p>
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
    </>
  );
}

function Mutate({ id }: { id: number }) {
  return (
    <ul role="list">
      <li>
        <form>
          <input type="hidden" name="intent" value="delete-message" />
          <input type="hidden" name="id" value={id} />
          <button type="submit">
            <img alt="" src="/images/icon-delete.svg" /> Delete
          </button>
        </form>
      </li>
      <li>
        <form>
          <input type="hidden" name="intent" value="edit-message" />
          <input type="hidden" name="id" value={id} />
          <button type="submit">
            <img alt="" src="/images/icon-edit.svg" /> Edit
          </button>
        </form>
      </li>
    </ul>
  );
}

export default App;
