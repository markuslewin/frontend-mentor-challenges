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

  comment(data: { content: string }): Comment;
  updateComment(data: { id: number; content: string }): void;
  upvoteComment(data: { id: number; on: boolean }): void;
  downvoteComment(data: { id: number; on: boolean }): void;
  replyToComment(data: { id: number; content: string }): Reply;
  removeComment(data: { id: number }): void;
  getVoteStateForComment(data: {
    id: number;
  }): "upvoted" | "downvoted" | "none";

  replyToReply(data: { id: number; content: string }): Reply;
  updateReply(data: { id: number; content: string }): void;
  upvoteReply(data: { id: number; on: boolean }): void;
  downvoteReply(data: { id: number; on: boolean }): void;
  removeReply(data: { id: number }): void;
  getVoteStateForReply(data: { id: number }): "upvoted" | "downvoted" | "none";
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
  const [comments, setComments] = serializedState<Comments>(
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
  const [commentVotes, setCommentVotes] = serializedState<Votes>(
    useLocalStorage("comment-votes"),
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
  const [replyVotes, setReplyVotes] = serializedState<Votes>(
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

  const scoredComments = comments
    .map((comment) => {
      const score = commentVotes
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

  const nextCommentId = Math.max(...comments.map((comment) => comment.id)) + 1;
  const nextReplyId =
    Math.max(
      ...comments.flatMap((comment) => comment.replies.map((reply) => reply.id))
    ) + 1;

  return (
    <CommentsContext.Provider
      value={{
        comments: scoredComments,
        comment({ content }) {
          const comment: Comment = {
            content,
            // todo: Timestamp
            createdAt: "Just now",
            id: nextCommentId,
            score: 0,
            user,
            replies: [],
          };

          setComments([...comments, comment]);
          return comment;
        },
        updateComment({ id, content }) {
          const comment = comments.find((comment) => comment.id === id);
          invariant(comment, "Comment not found");

          const nextComment: Comment = { ...comment, content };

          setComments(
            comments.map((comment) =>
              comment.id === nextComment.id ? nextComment : comment
            )
          );
        },
        upvoteComment({ id, on }) {
          const filteredVotes = commentVotes.filter(
            (vote) => vote.messageId !== id
          );
          const nextVotes: Votes = on
            ? [...filteredVotes, { messageId: id, type: "upvote" }]
            : filteredVotes;

          setCommentVotes(nextVotes);
        },
        downvoteComment({ id, on }) {
          const filteredVotes = commentVotes.filter(
            (vote) => vote.messageId !== id
          );
          const nextVotes: Votes = on
            ? [...filteredVotes, { messageId: id, type: "downvote" }]
            : filteredVotes;

          setCommentVotes(nextVotes);
        },
        replyToComment({ id, content }) {
          const comment = comments.find((comment) => comment.id === id);
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

          setComments(
            comments.map((c) =>
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
        removeComment({ id }) {
          const comment = comments.find((comment) => comment.id === id);
          invariant(comment, "Comment not found");
          invariant(comment.user.username === user.username, "Forbidden");

          setComments(comments.filter((c) => c.id !== comment.id));
          setCommentVotes(commentVotes.filter((vote) => vote.messageId !== id));
        },
        getVoteStateForComment({ id }) {
          const vote = commentVotes.find((vote) => vote.messageId === id);
          return vote?.type === "upvote"
            ? "upvoted"
            : vote?.type === "downvote"
            ? "downvoted"
            : "none";
        },

        replyToReply({ content, id }) {
          const comment = comments.find((comment) =>
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

          setComments([
            ...comments.map((c) =>
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
        updateReply({ content, id }) {
          const comment = comments.find((comment) =>
            comment.replies.find((reply) => reply.id === id)
          );
          invariant(comment, "Parent comment not found");
          const reply = comment.replies.find((reply) => reply.id === id);
          invariant(reply, "Reply not found");

          setComments([
            ...comments.map((c) =>
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
        upvoteReply({ id, on }) {
          const filteredVotes = replyVotes.filter(
            (vote) => vote.messageId !== id
          );
          const nextVotes: Votes = on
            ? [...filteredVotes, { messageId: id, type: "upvote" }]
            : filteredVotes;

          setReplyVotes(nextVotes);
        },
        downvoteReply({ id, on }) {
          const filteredVotes = replyVotes.filter(
            (vote) => vote.messageId !== id
          );
          const nextVotes: Votes = on
            ? [...filteredVotes, { messageId: id, type: "downvote" }]
            : filteredVotes;

          setReplyVotes(nextVotes);
        },
        removeReply({ id }) {
          const comment = comments.find((comment) =>
            comment.replies.find((reply) => reply.id === id)
          );
          invariant(comment, "Parent comment not found");

          setComments([
            ...comments.map((c) =>
              c.id === comment.id
                ? {
                    ...comment,
                    replies: comment.replies.filter((r) => r.id !== id),
                  }
                : c
            ),
          ]);
          setReplyVotes(replyVotes.filter((vote) => vote.messageId !== id));
        },
        getVoteStateForReply({ id }) {
          const vote = replyVotes.find((vote) => vote.messageId === id);
          return vote?.type === "upvote"
            ? "upvoted"
            : vote?.type === "downvote"
            ? "downvoted"
            : "none";
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
