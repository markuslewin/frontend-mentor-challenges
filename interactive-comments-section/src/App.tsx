import spriteUrl from "./images/sprite.svg";
import { useComments } from "./utils/comments";
import type { Comment, Reply } from "./utils/comments";
import { ReactNode, forwardRef, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useUser } from "./utils/user";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Toggle from "@radix-ui/react-toggle";
import * as CreateMessage from "./components/create-message";
import { CreateMessageSchema } from "./components/create-message";
import { Avatar } from "./components/avatar";
import { Textarea } from "./components/textarea";
import { Button } from "./components/button";
import { useMapRef } from "./utils/map";

function App() {
  const { comments, db } = useComments();
  const addCommentContentRef = useRef<HTMLTextAreaElement>(null);
  const commentsMap = useMapRef<number, HTMLHeadingElement>();
  const repliesMap = useMapRef<number, HTMLHeadingElement>();

  return (
    <main className="min-h-screen px-4 py-8 tablet:p-16">
      <div className="max-w-[45.625rem] box-content mx-auto">
        <h1 className="sr-only">Interactive comments section</h1>
        <h2 className="sr-only">Comments</h2>
        <div className="grid gap-4 tablet:gap-5">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              ref={(node) => {
                commentsMap.setOrDelete(comment.id, node);
              }}
              comment={comment}
              updateReplyRef={repliesMap.setOrDelete}
              onReply={(data) => {
                let id: number | null = null;
                flushSync(() => {
                  const reply = db.comment.reply(data);
                  id = reply.id;
                });
                // Should never happen
                if (id === null) return;

                const $reply = repliesMap.get(id);
                $reply?.focus();
              }}
              onReplyReply={(data) => {
                let id: number | null = null;
                flushSync(() => {
                  const reply = db.reply.create(data);
                  id = reply.id;
                });
                // Should never happen
                if (id === null) return;

                const $reply = repliesMap.get(id);
                $reply?.focus();
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
          <CreateMessage.Root>
            <CreateMessage.Form
              onCreateMessage={(data) => {
                let id: number | null = null;
                flushSync(() => {
                  const comment = db.comment.create(data.content);
                  id = comment.id;
                });
                // Should never happen
                if (id === null) return;

                const $comment = commentsMap.get(id);
                $comment?.focus();
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
          </CreateMessage.Root>
        </section>
      </div>
    </main>
  );
}

const Comment = forwardRef<
  HTMLHeadingElement,
  {
    comment: Comment;
    updateReplyRef(id: number, node: HTMLHeadingElement | null): void;
    onReply(data: { id: number; content: string }): void;
    onReplyReply(data: { id: number; content: string }): void;
  }
>(({ comment, updateReplyRef, onReply, onReplyReply }, ref) => {
  const { user } = useUser();
  const { votes, db } = useComments();
  const [isEditing, setIsEditing] = useState(false);
  const editContentId = useId();
  const editContentRef = useRef<HTMLTextAreaElement>(null);
  const [isReplying, setIsReplying] = useState(false);
  const replyContentRef = useRef<HTMLTextAreaElement>(null);

  const vote = votes.find((vote) => vote.messageId === comment.id);
  const state =
    vote?.type === "upvote"
      ? "upvoted"
      : vote?.type === "downvote"
      ? "downvoted"
      : "none";

  return (
    <article data-testid="comment">
      <Collapsible.Root open={isReplying}>
        <div className="message-layout bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:shape-p-6">
          <footer className="message-layout__footer">
            <h3
              ref={ref}
              tabIndex={-1}
              className="flex items-center gap-y-1 gap-x-4 flex-wrap"
            >
              <Avatar alt="" image={comment.user.image} />
              <span className="flex items-baseline gap-y-1 gap-x-4 flex-wrap">
                <span className="text-heading-m text-dark-blue flex flex-wrap gap-x-2">
                  {comment.user.username}
                  {comment.user.username === user.username ? <You /> : null}
                </span>
                <p>{comment.createdAt}</p>
              </span>
            </h3>
          </footer>
          <div className="message-layout__content">
            {isEditing ? (
              <form
                className="grid justify-items-end gap-2 tablet:gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const result = CreateMessageSchema.safeParse(
                    Object.fromEntries(formData)
                  );
                  if (!result.success) return;

                  db.comment.update({
                    id: comment.id,
                    content: result.data.content,
                  });
                  setIsEditing(false);
                }}
              >
                <label className="sr-only" htmlFor={editContentId}>
                  Edit message
                </label>
                <Textarea
                  ref={editContentRef}
                  id={editContentId}
                  name="content"
                  defaultValue={comment.content}
                />
                <Button type="submit">Update</Button>
              </form>
            ) : (
              <p className="whitespace-pre-wrap">{comment.content}</p>
            )}
          </div>
          <div className="message-layout__score">
            <Score
              score={comment.score}
              state={state}
              onToggleUpvote={() => {
                db.comment.upvote({
                  id: comment.id,
                  on: state !== "upvoted",
                });
              }}
              onToggleDownvote={() => {
                db.comment.downvote({
                  id: comment.id,
                  on: state !== "downvoted",
                });
              }}
            />
          </div>
          <div className="message-layout__mutate">
            {user.username === comment.user.username ? (
              <Mutate
                isEditing={isEditing}
                onIsEditingChange={(next) => {
                  if (next) {
                    flushSync(() => {
                      setIsEditing(true);
                    });
                    editContentRef.current?.select();
                  } else {
                    setIsEditing(false);
                  }
                }}
                onDelete={() => {
                  db.comment.remove(comment.id);
                }}
              />
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
          <CreateMessage.Root>
            <CreateMessage.Form
              onCreateMessage={(data) => {
                setIsReplying(false);
                onReply({ ...data, id: comment.id });
              }}
            >
              <CreateMessage.TextareaContainer>
                <CreateMessage.Label>Reply to message</CreateMessage.Label>
                <CreateMessage.Textarea
                  ref={replyContentRef}
                  defaultValue={`@${comment.user.username} `}
                />
              </CreateMessage.TextareaContainer>
              <CreateMessage.CommentingAs />
              <CreateMessage.Create>Reply</CreateMessage.Create>
            </CreateMessage.Form>
          </CreateMessage.Root>
        </Collapsible.Content>
      </Collapsible.Root>
      {comment.replies.length ? (
        <div className="mt-4 grid grid-cols-[2px_1fr] gap-4 tablet:mt-5 tablet:grid-cols-[5.5rem_1fr] tablet:justify-items-center tablet:gap-y-5 tablet:gap-x-0">
          <div className="border-l-2 text-light-gray"></div>
          <div className="w-full grid gap-4 tablet:gap-5">
            {comment.replies.map((reply) => (
              <Reply
                key={reply.id}
                ref={(node) => {
                  updateReplyRef(reply.id, node);
                }}
                reply={reply}
                onReply={onReplyReply}
              />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
});

const Reply = forwardRef<
  HTMLHeadingElement,
  {
    reply: Reply;
    onReply(data: { id: number; content: string }): void;
  }
>(({ reply, onReply }, ref) => {
  const { user } = useUser();
  const { db } = useComments();
  const [isEditing, setIsEditing] = useState(false);
  const editContentId = useId();
  const editContentRef = useRef<HTMLTextAreaElement>(null);
  const [isReplying, setIsReplying] = useState(false);
  const replyContentRef = useRef<HTMLTextAreaElement>(null);

  const replyingToPrefix = `@${reply.replyingTo} `;

  const vote = db.reply.votes.find((vote) => vote.messageId === reply.id);
  const state =
    vote?.type === "upvote"
      ? "upvoted"
      : vote?.type === "downvote"
      ? "downvoted"
      : "none";

  return (
    <article>
      <Collapsible.Root open={isReplying}>
        <div className="message-layout bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:shape-p-6">
          <footer className="message-layout__footer">
            <h4
              className="flex items-center gap-y-1 gap-x-4 flex-wrap"
              ref={ref}
              tabIndex={-1}
            >
              <Avatar alt="" image={reply.user.image} />
              <span className="flex items-baseline gap-y-1 gap-x-4 flex-wrap">
                <span className="text-heading-m text-dark-blue flex flex-wrap gap-x-2">
                  {reply.user.username}
                  {reply.user.username === user.username ? <You /> : null}
                </span>
                <p>{reply.createdAt}</p>
              </span>
            </h4>
          </footer>
          <div className="message-layout__content">
            {isEditing ? (
              <form
                className="grid justify-items-end gap-2 tablet:gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const result = CreateMessageSchema.safeParse(
                    Object.fromEntries(formData)
                  );
                  if (!result.success) return;

                  db.reply.update({
                    id: reply.id,
                    content: result.data.content,
                  });
                  setIsEditing(false);
                }}
              >
                <label className="sr-only" htmlFor={editContentId}>
                  Edit message
                </label>
                <Textarea
                  ref={editContentRef}
                  id={editContentId}
                  name="content"
                  defaultValue={reply.content}
                />
                <Button type="submit">Update</Button>
              </form>
            ) : (
              <p className="whitespace-pre-wrap">
                {
                  <>
                    <b className="font-medium text-moderate-blue">
                      @{reply.replyingTo}
                    </b>{" "}
                    {reply.content.startsWith(replyingToPrefix)
                      ? reply.content.slice(replyingToPrefix.length)
                      : reply.content}
                  </>
                }
              </p>
            )}
          </div>
          <div className="message-layout__score">
            <Score
              score={reply.score}
              state={state}
              onToggleUpvote={() => {
                db.reply.upvote({ id: reply.id, on: state !== "upvoted" });
              }}
              onToggleDownvote={() => {
                db.reply.downvote({
                  id: reply.id,
                  on: state !== "downvoted",
                });
              }}
            />
          </div>
          <div className="message-layout__mutate">
            {user.username === reply.user.username ? (
              <Mutate
                isEditing={isEditing}
                onIsEditingChange={(next) => {
                  if (next) {
                    flushSync(() => {
                      setIsEditing(true);
                    });
                    editContentRef.current?.select();
                  } else {
                    setIsEditing(false);
                  }
                }}
                onDelete={() => {
                  db.reply.remove({ id: reply.id });
                }}
              />
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
          <CreateMessage.Root>
            <CreateMessage.Form
              onCreateMessage={(data) => {
                setIsReplying(false);
                onReply({ ...data, id: reply.id });
              }}
            >
              <CreateMessage.TextareaContainer>
                <CreateMessage.Label>Reply to message</CreateMessage.Label>
                <CreateMessage.Textarea
                  ref={replyContentRef}
                  defaultValue={`@${reply.user.username} `}
                />
              </CreateMessage.TextareaContainer>
              <CreateMessage.CommentingAs />
              <CreateMessage.Create>Reply</CreateMessage.Create>
            </CreateMessage.Form>
          </CreateMessage.Root>
        </Collapsible.Content>
      </Collapsible.Root>
    </article>
  );
});

function You() {
  return (
    <span className="leading-[0.9375rem] text-[0.8125rem] lowercase shape-py-[0.125rem] shape-px-[0.375rem] shape-border-[1px] border-transparent rounded-sm bg-moderate-blue text-white">
      <span className="sr-only"> (</span>You
      <span className="sr-only">)</span>
    </span>
  );
}

function Score({
  score,
  state,
  onToggleUpvote,
  onToggleDownvote,
}: {
  score: number;
  state: "upvoted" | "downvoted" | "none";
  onToggleUpvote(): void;
  onToggleDownvote(): void;
}) {
  return (
    <div className="h-10 min-w-[6.25rem] px-3 border-[1px] border-transparent grid grid-cols-[max-content_1fr_max-content] items-center text-center font-medium rounded-[0.625rem] bg-very-light-gray text-moderate-blue tablet:h-[6.25rem] tablet:px-0 tablet:min-w-10 tablet:grid-cols-none">
      <div>
        <Toggle.Root
          className="clickable outline-offset-8 text-light-grayish-blue hocus:text-moderate-blue data-[state=on]:text-moderate-blue transition-colors"
          pressed={state === "upvoted"}
          onClick={onToggleUpvote}
        >
          <Icon className="size-[0.625rem]" name="plus" />
          <span className="sr-only">Upvote</span>
        </Toggle.Root>
      </div>
      <p data-testid="score">
        {score}
        <span className="sr-only"> points</span>
      </p>
      <div>
        <Toggle.Root
          className="clickable outline-offset-8 text-light-grayish-blue hocus:text-moderate-blue data-[state=on]:text-moderate-blue transition-colors"
          pressed={state === "downvoted"}
          onClick={onToggleDownvote}
        >
          <Icon className="size-[0.625rem]" name="minus" />
          <span className="sr-only">Downvote</span>
        </Toggle.Root>
      </div>
    </div>
  );
}

function Mutate({
  isEditing,
  onDelete,
  onIsEditingChange,
}: {
  isEditing: boolean;
  onDelete(): void;
  onIsEditingChange(isEditing: boolean): void;
}) {
  return (
    <ul
      className="flex flex-wrap justify-end gap-y-1 gap-x-4 tablet:gap-y-1 tablet:gap-x-6"
      role="list"
    >
      <li>
        <DeleteMessage
          className="grid grid-cols-[max-content_1fr] gap-2 items-baseline font-medium text-soft-red hocus:text-pale-red transition-colors"
          onDelete={() => {
            onDelete();
          }}
        >
          <Icon className="size-[0.875rem]" name="delete" /> Delete
        </DeleteMessage>
      </li>
      <li>
        <Toggle.Root
          className="grid grid-cols-[max-content_1fr] gap-2 items-baseline font-medium text-moderate-blue hocus:text-light-grayish-blue transition-colors"
          pressed={isEditing}
          onClick={() => {
            onIsEditingChange(!isEditing);
          }}
        >
          <Icon className="size-[0.875rem]" name="edit" /> Edit
        </Toggle.Root>
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
              Delete comment
            </AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete this comment? This will remove the
              comment and can’t be undone.
            </AlertDialog.Description>
            <div className="grid grid-cols-2 gap-3 tablet:gap-[0.875rem]">
              <AlertDialog.Cancel asChild>
                <Button bgColor="grayish-blue">No, cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onClick={onDelete}>
                <Button bgColor="soft-red">Yes, delete</Button>
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
