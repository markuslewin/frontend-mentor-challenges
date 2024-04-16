import { useComments } from "./utils/comments";
import type { Comment, Reply } from "./utils/comments";
import { forwardRef, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useUser } from "./utils/user";
import * as CreateMessage from "./components/create-message";
import * as MessageLayout from "./components/message-layout";
import * as ReplyMessage from "./components/reply-message";
import { CreateMessageSchema } from "./components/create-message";
import { Avatar } from "./components/avatar";
import { Textarea } from "./components/textarea";
import { Button } from "./components/button";
import { useMapRef } from "./utils/map";
import { Author, Meta, Mutate, Score, You } from "./components/message";
import { Icon } from "./components/icon";

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
              onEdit={(data) => {
                db.comment.update(data);
                const $comment = commentsMap.get(data.id);
                $comment?.focus();
              }}
              onEditReply={(data) => {
                db.reply.update(data);
                const $reply = repliesMap.get(data.id);
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
    onEdit(data: { id: number; content: string }): void;
    onEditReply(data: { id: number; content: string }): void;
  }
>(
  (
    { comment, updateReplyRef, onReply, onReplyReply, onEdit, onEditReply },
    ref
  ) => {
    const { user } = useUser();
    const { votes, db } = useComments();
    const [isEditing, setIsEditing] = useState(false);
    const editContentId = useId();
    const editContentRef = useRef<HTMLTextAreaElement>(null);
    const [isReplying, setIsReplying] = useState(false);

    const vote = votes.find((vote) => vote.messageId === comment.id);
    const state =
      vote?.type === "upvote"
        ? "upvoted"
        : vote?.type === "downvote"
        ? "downvoted"
        : "none";

    return (
      <article data-testid="comment">
        <ReplyMessage.Root
          isReplying={isReplying}
          onIsReplyingChange={setIsReplying}
        >
          <MessageLayout.Root>
            <MessageLayout.Footer>
              <h3
                className="flex items-center gap-y-1 gap-x-4 flex-wrap"
                ref={ref}
                tabIndex={-1}
              >
                <Avatar alt="" image={comment.user.image} />
                <Meta>
                  <Author>
                    {comment.user.username}
                    {comment.user.username === user.username ? <You /> : null}
                  </Author>
                  <p>{comment.createdAt}</p>
                </Meta>
              </h3>
            </MessageLayout.Footer>
            <MessageLayout.Content>
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

                    setIsEditing(false);
                    onEdit({ ...result.data, id: comment.id });
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
            </MessageLayout.Content>
            <MessageLayout.Score>
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
            </MessageLayout.Score>
            <MessageLayout.Mutate>
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
                  <ReplyMessage.Trigger>
                    <Icon className="size-[0.875rem]" name="reply" /> Reply
                  </ReplyMessage.Trigger>
                </div>
              )}
            </MessageLayout.Mutate>
          </MessageLayout.Root>
          <ReplyMessage.Content>
            <CreateMessage.Root>
              <CreateMessage.Form
                onCreateMessage={(data) => {
                  setIsReplying(false);
                  onReply({ ...data, id: comment.id });
                }}
              >
                <CreateMessage.TextareaContainer>
                  <CreateMessage.Label>Reply to message</CreateMessage.Label>
                  <ReplyMessage.Textarea asChild>
                    <CreateMessage.Textarea
                      defaultValue={`@${comment.user.username} `}
                    />
                  </ReplyMessage.Textarea>
                </CreateMessage.TextareaContainer>
                <CreateMessage.CommentingAs />
                <CreateMessage.Create>Reply</CreateMessage.Create>
              </CreateMessage.Form>
            </CreateMessage.Root>
          </ReplyMessage.Content>
        </ReplyMessage.Root>
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
                  onEdit={onEditReply}
                />
              ))}
            </div>
          </div>
        ) : null}
      </article>
    );
  }
);

const Reply = forwardRef<
  HTMLHeadingElement,
  {
    reply: Reply;
    onReply(data: { id: number; content: string }): void;
    onEdit(data: { id: number; content: string }): void;
  }
>(({ reply, onReply, onEdit }, ref) => {
  const { user } = useUser();
  const { db } = useComments();
  const [isEditing, setIsEditing] = useState(false);
  const editContentId = useId();
  const editContentRef = useRef<HTMLTextAreaElement>(null);
  const [isReplying, setIsReplying] = useState(false);

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
      <ReplyMessage.Root
        isReplying={isReplying}
        onIsReplyingChange={setIsReplying}
      >
        <MessageLayout.Root>
          <MessageLayout.Footer>
            <h4
              className="flex items-center gap-y-1 gap-x-4 flex-wrap"
              ref={ref}
              tabIndex={-1}
            >
              <Avatar alt="" image={reply.user.image} />
              <Meta>
                <Author>
                  {reply.user.username}
                  {reply.user.username === user.username ? <You /> : null}
                </Author>
                <p>{reply.createdAt}</p>
              </Meta>
            </h4>
          </MessageLayout.Footer>
          <MessageLayout.Content>
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

                  setIsEditing(false);
                  onEdit({ ...result.data, id: reply.id });
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
          </MessageLayout.Content>
          <MessageLayout.Score>
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
          </MessageLayout.Score>
          <MessageLayout.Mutate>
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
                <ReplyMessage.Trigger>
                  <Icon className="size-[0.875rem]" name="reply" /> Reply
                </ReplyMessage.Trigger>
              </div>
            )}
          </MessageLayout.Mutate>
        </MessageLayout.Root>
        <ReplyMessage.Content>
          <CreateMessage.Root>
            <CreateMessage.Form
              onCreateMessage={(data) => {
                setIsReplying(false);
                onReply({ ...data, id: reply.id });
              }}
            >
              <CreateMessage.TextareaContainer>
                <CreateMessage.Label>Reply to message</CreateMessage.Label>
                <ReplyMessage.Textarea asChild>
                  <CreateMessage.Textarea
                    defaultValue={`@${reply.user.username} `}
                  />
                </ReplyMessage.Textarea>
              </CreateMessage.TextareaContainer>
              <CreateMessage.CommentingAs />
              <CreateMessage.Create>Reply</CreateMessage.Create>
            </CreateMessage.Form>
          </CreateMessage.Root>
        </ReplyMessage.Content>
      </ReplyMessage.Root>
    </article>
  );
});

export default App;
