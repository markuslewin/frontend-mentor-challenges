import { useLocalStorage } from "./local-storage";
import { comments as initialComments } from "../data/data.json";
import { z } from "zod";
import { useUser } from "./user";
import { invariant } from "@epic-web/invariant";
import { ReactNode, createContext, useContext } from "react";

const CommentsSchema = z.array(
  z.object({
    id: z.number(),
    content: z.string(),
    createdAt: z.string(),
    score: z.number(),
    user: z.object({
      image: z.object({
        png: z.string(),
        webp: z.string(),
      }),
      username: z.string(),
    }),
    replies: z.array(
      z.object({
        id: z.number(),
        content: z.string(),
        createdAt: z.string(),
        score: z.number(),
        replyingTo: z.string(),
        user: z.object({
          image: z.object({
            png: z.string(),
            webp: z.string(),
          }),
          username: z.string(),
        }),
      })
    ),
  })
);

export type Comments = z.infer<typeof CommentsSchema>;
export type Comment = Comments[number];
export type Reply = Comment["replies"][number];

const VotesSchema = z.array(
  z.object({
    type: z.union([z.literal("upvote"), z.literal("downvote")]),
    messageId: z.number(),
  })
);

type Votes = z.infer<typeof VotesSchema>;

const CommentsContext = createContext<{
  comments: Comments;
  votes: Votes;
  db: {
    comment: {
      create(content: string): Comment;
      update(data: { id: number; content: string }): void;
      upvote(data: { id: number; on: boolean }): void;
      downvote(data: { id: number; on: boolean }): void;
      reply(data: { id: number; content: string }): Reply;
      remove(id: number): void;
    };
    reply: {
      votes: Votes;
      create(data: { id: number; content: string }): Reply;
      update(data: { id: number; content: string }): void;
      upvote(data: { id: number; on: boolean }): void;
      downvote(data: { id: number; on: boolean }): void;
      remove(data: { id: number }): void;
    };
  };
} | null>(null);

function serializedState<T>(
  [value, setValue]: readonly [string | null, (value: string | null) => void],
  {
    serialize,
    deserialize,
  }: {
    serialize(value: T): string;
    deserialize(value: string | null): T;
  }
) {
  return [
    deserialize(value),
    (value: T) => {
      setValue(serialize(value));
    },
  ] as const;
}

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [sourceComments, setSourceComments] = serializedState<Comments>(
    useLocalStorage("comments"),
    {
      serialize(value) {
        return JSON.stringify(value);
      },
      deserialize(value) {
        if (typeof value !== "string") return initialComments;
        try {
          const parsed = JSON.parse(value);
          const comments = CommentsSchema.parse(parsed);
          return comments;
        } catch (error) {
          return initialComments;
        }
      },
    }
  );
  const [votes, setRawVotes] = serializedState<Votes>(
    useLocalStorage("votes"),
    {
      serialize(value) {
        return JSON.stringify(value);
      },
      deserialize(value) {
        if (typeof value !== "string") return [];
        try {
          const parsed = JSON.parse(value);
          const votes = VotesSchema.parse(parsed);
          return votes;
        } catch (error) {
          return [];
        }
      },
    }
  );
  const [replyVotes, setRawReplyVotes] = serializedState<Votes>(
    useLocalStorage("reply-votes"),
    {
      serialize(value) {
        return JSON.stringify(value);
      },
      deserialize(value) {
        if (typeof value !== "string") return [];
        try {
          const parsed = JSON.parse(value);
          const votes = VotesSchema.parse(parsed);
          return votes;
        } catch (error) {
          return [];
        }
      },
    }
  );
  const { user } = useUser();

  const comments = sourceComments
    .map((comment) => {
      const score = votes
        .filter((vote) => vote.messageId === comment.id)
        .reduce(
          (score, vote) => score + (vote.type === "upvote" ? 1 : -1),
          comment.score
        );
      return {
        ...comment,
        score,
        replies: comment.replies.map((reply) => {
          const score = replyVotes
            .filter((vote) => vote.messageId === reply.id)
            .reduce(
              (score, vote) => score + (vote.type === "upvote" ? 1 : -1),
              reply.score
            );
          return { ...reply, score };
        }),
      };
    })
    .sort((a, b) => b.score - a.score);

  const nextCommentId =
    Math.max(...sourceComments.map((comment) => comment.id)) + 1;
  const nextReplyId =
    Math.max(
      ...sourceComments.flatMap((comment) =>
        comment.replies.map((reply) => reply.id)
      )
    ) + 1;

  return (
    <CommentsContext.Provider
      value={{
        comments,
        votes,
        db: {
          comment: {
            create(content) {
              const comment: Comment = {
                content,
                // todo: Timestamp
                createdAt: "Just now",
                id: nextCommentId,
                score: 0,
                user,
                replies: [],
              };
              setSourceComments([...sourceComments, comment]);
              return comment;
            },
            update({ id, content }) {
              const comment = sourceComments.find(
                (comment) => comment.id === id
              );
              invariant(comment, "Comment not found");

              const nextComment = { ...comment, content };
              setSourceComments(
                sourceComments.map((comment) =>
                  comment.id === nextComment.id ? nextComment : comment
                )
              );
            },
            upvote({ id, on }) {
              const filteredVotes = votes.filter(
                (vote) => vote.messageId !== id
              );
              const nextVotes: Votes = on
                ? [...filteredVotes, { messageId: id, type: "upvote" }]
                : filteredVotes;

              setRawVotes(nextVotes);
            },
            downvote({ id, on }) {
              const filteredVotes = votes.filter(
                (vote) => vote.messageId !== id
              );
              const nextVotes: Votes = on
                ? [...filteredVotes, { messageId: id, type: "downvote" }]
                : filteredVotes;

              setRawVotes(nextVotes);
            },
            reply({ id, content }) {
              const comment = sourceComments.find(
                (comment) => comment.id === id
              );
              invariant(comment, "Comment not found");

              const reply: Reply = {
                content,
                // todo: Timestamp
                createdAt: "Just now",
                id: nextReplyId,
                replyingTo: comment.user.username,
                score: 0,
                user,
              };

              setSourceComments(
                sourceComments.map((c) =>
                  c.id === comment.id
                    ? {
                        ...comment,
                        replies: [...comment.replies, reply],
                      }
                    : c
                )
              );
              return reply;
            },
            remove(id) {
              const comment = sourceComments.find(
                (comment) => comment.id === id
              );
              invariant(comment, "Comment not found");
              invariant(comment.user.username === user.username, "Forbidden");

              setSourceComments(
                sourceComments.filter((c) => c.id !== comment.id)
              );
              setRawVotes(votes.filter((vote) => vote.messageId !== id));
            },
          },
          reply: {
            votes: replyVotes,
            create({ content, id }) {
              const comment = sourceComments.find((comment) =>
                comment.replies.find((reply) => reply.id === id)
              );
              invariant(comment, "Parent comment not found");
              const reply = comment.replies.find((reply) => reply.id === id);
              invariant(reply, "Reply not found");

              const newReply: Reply = {
                content,
                createdAt: "Just now",
                id: nextReplyId,
                replyingTo: reply.user.username,
                score: 0,
                user,
              };

              setSourceComments([
                ...sourceComments.map((c) =>
                  c.id === comment.id
                    ? {
                        ...comment,
                        replies: [...comment.replies, newReply],
                      }
                    : c
                ),
              ]);
              return newReply;
            },
            update({ content, id }) {
              const comment = sourceComments.find((comment) =>
                comment.replies.find((reply) => reply.id === id)
              );
              invariant(comment, "Parent comment not found");
              const reply = comment.replies.find((reply) => reply.id === id);
              invariant(reply, "Reply not found");

              setSourceComments([
                ...sourceComments.map((c) =>
                  c.id === comment.id
                    ? {
                        ...comment,
                        replies: comment.replies.map((r) =>
                          r.id === reply.id ? { ...reply, content } : r
                        ),
                      }
                    : c
                ),
              ]);
            },
            upvote({ id, on }) {
              const filteredVotes = replyVotes.filter(
                (vote) => vote.messageId !== id
              );
              const nextVotes: Votes = on
                ? [...filteredVotes, { messageId: id, type: "upvote" }]
                : filteredVotes;

              setRawReplyVotes(nextVotes);
            },
            downvote({ id, on }) {
              const filteredVotes = replyVotes.filter(
                (vote) => vote.messageId !== id
              );
              const nextVotes: Votes = on
                ? [...filteredVotes, { messageId: id, type: "downvote" }]
                : filteredVotes;

              setRawReplyVotes(nextVotes);
            },
            remove({ id }) {
              const comment = sourceComments.find((comment) =>
                comment.replies.find((reply) => reply.id === id)
              );
              invariant(comment, "Parent comment not found");

              setSourceComments([
                ...sourceComments.map((c) =>
                  c.id === comment.id
                    ? {
                        ...comment,
                        replies: comment.replies.filter((r) => r.id !== id),
                      }
                    : c
                ),
              ]);
              setRawReplyVotes(
                replyVotes.filter((vote) => vote.messageId !== id)
              );
            },
          },
        },
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const value = useContext(CommentsContext);
  invariant(value, "useComments must be used inside a CommentsProvider");

  return value;
}
