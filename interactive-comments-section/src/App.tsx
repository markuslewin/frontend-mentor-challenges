import spriteUrl from "./images/sprite.svg";
import { useComments } from "./utils/comments";
import type { Comment, Reply } from "./utils/comments";
import { ReactNode, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useUser } from "./utils/user";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as CreateMessage from "./components/create-message";
import { Avatar } from "./components/avatar";

function App() {
  const { comments, create, reply, remove } = useComments();
  const addCommentContentRef = useRef<HTMLTextAreaElement>(null);

  return (
    <main className="min-h-screen px-4 py-8 tablet:p-16">
      <div className="max-w-[45.625rem] box-content mx-auto">
        <h1 className="sr-only">Interactive comments section</h1>
        <div className="grid gap-4 tablet:gap-5">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={(data) => {
                remove(data.id);
              }}
              onReply={(data) => {
                reply(data);
              }}
            />
          ))}
        </div>
        <section
          className="mt-4 tablet:mt-5"
          aria-labelledby="add-comment-label"
        >
          <h2 className="sr-only" id="add-comment-label">
            Add a comment
          </h2>
          <CreateMessage.Form
            onCreateMessage={(data) => {
              flushSync(() => {
                create(data.content);
              });
              const $content = addCommentContentRef.current;
              if (!$content) return;

              $content.focus();
              $content.scrollIntoView(false);
            }}
          >
            <CreateMessage.TextareaContainer>
              <CreateMessage.Label>Add a comment</CreateMessage.Label>
              <CreateMessage.Textarea
                ref={addCommentContentRef}
                placeholder="Add a comment…"
              />
            </CreateMessage.TextareaContainer>
            <CreateMessage.CommentingAs />
            <CreateMessage.Create>Send</CreateMessage.Create>
          </CreateMessage.Form>
        </section>
      </div>
    </main>
  );
}

function Comment({
  comment,
  onDelete,
  onReply,
}: {
  comment: Comment;
  onDelete: OnDeleteMessage;
  onReply: (data: { id: number; content: string }) => void;
}) {
  const { user } = useUser();
  const [isReplying, setIsReplying] = useState(false);
  const replyContentRef = useRef<HTMLTextAreaElement>(null);
  const [replyContent, setReplyContent] = useState("");

  return (
    <article>
      <Collapsible.Root open={isReplying}>
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
            {user.username === comment.user.username ? (
              <Mutate id={comment.id} onDelete={onDelete} />
            ) : (
              <div className="flex justify-end">
                <Collapsible.Trigger
                  className="grid grid-cols-[max-content_1fr] gap-2 items-center font-medium text-moderate-blue hocus:text-light-grayish-blue transition-colors"
                  onClick={() => {
                    if (isReplying) {
                      setIsReplying(false);
                    } else {
                      flushSync(() => {
                        setIsReplying(true);
                      });
                      const $content = replyContentRef.current;
                      if (!$content) return;

                      $content.focus();
                      const length = $content.value.length;
                      $content.setSelectionRange(length, length);
                    }
                  }}
                >
                  <Icon className="size-[0.875rem]" name="reply" /> Reply
                </Collapsible.Trigger>
              </div>
            )}
          </div>
        </div>
        <Collapsible.Content className="mt-2">
          <CreateMessage.Form
            onCreateMessage={() => {
              onReply({ id: comment.id, content: replyContent });
              setIsReplying(false);
              setReplyContent("");
            }}
          >
            <CreateMessage.TextareaContainer>
              <CreateMessage.Label>Reply to comment</CreateMessage.Label>
              <CreateMessage.Textarea
                ref={replyContentRef}
                value={`@${comment.user.username} ${replyContent}`}
                onChange={(event) =>
                  setReplyContent(
                    event.target.value.slice(
                      `@${comment.user.username} `.length
                    )
                  )
                }
              />
            </CreateMessage.TextareaContainer>
            <CreateMessage.CommentingAs />
            <CreateMessage.Create>Reply</CreateMessage.Create>
          </CreateMessage.Form>
        </Collapsible.Content>
      </Collapsible.Root>
      {comment.replies.length ? (
        <div className="mt-4 grid grid-cols-[2px_1fr] gap-4 tablet:mt-5 tablet:grid-cols-[5.5rem_1fr] tablet:justify-items-center tablet:gap-y-5 tablet:gap-x-0">
          <div className="border-l-2 text-light-gray"></div>
          <div className="w-full grid gap-4 tablet:gap-5">
            {comment.replies.map((reply) => (
              <Reply key={reply.id} reply={reply} onDelete={onDelete} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function Reply({
  reply,
  onDelete,
}: {
  reply: Reply;
  onDelete: OnDeleteMessage;
}) {
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
        <Mutate id={reply.id} onDelete={onDelete} />
      </div>
    </article>
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

type OnDeleteMessage = (data: { id: number }) => void;

function Mutate({ id, onDelete }: { id: number; onDelete: OnDeleteMessage }) {
  return (
    <ul
      className="flex flex-wrap justify-end gap-y-1 gap-x-4 tablet:gap-y-1 tablet:gap-x-6"
      role="list"
    >
      <li>
        <DeleteMessage
          className="grid grid-cols-[max-content_1fr] gap-2 items-baseline font-medium text-soft-red hocus:text-pale-red transition-colors"
          onDelete={() => {
            onDelete({ id });
          }}
        >
          <Icon className="size-[0.875rem]" name="delete" /> Delete
        </DeleteMessage>
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

function DeleteMessage({
  className,
  children,
  onDelete,
}: {
  className?: string;
  children: ReactNode;
  onDelete(): void;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className={className}>
        {children}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 p-4 overflow-y-scroll grid place-items-center bg-[hsl(0_0%_0%_/_50%)]">
          <AlertDialog.Content className="grid gap-4 w-full max-w-[25rem] rounded-lg shape-py-6 shape-px-7 shape-border-[1px] border-transparent bg-white text-grayish-blue tablet:gap-5 tablet:shape-p-8">
            <AlertDialog.Title className="text-[1.25rem] font-medium leading-[1.5rem] text-dark-blue tablet:text-heading-l">
              Are you absolutely sure?
            </AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialog.Description>
            <div className="grid grid-cols-2 gap-3 tablet:gap-[0.875rem]">
              <AlertDialog.Cancel className="uppercase p-3 rounded-lg bg-grayish-blue text-white hocus:bg-[hsl(211_10%_80%)] transition-colors">
                No, cancel
              </AlertDialog.Cancel>
              <AlertDialog.Action
                className="uppercase p-3 rounded-lg bg-soft-red text-white hocus:bg-pale-red transition-colors"
                onClick={onDelete}
              >
                Yes, delete
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
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
