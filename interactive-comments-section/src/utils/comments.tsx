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

function parseComments(value: unknown) {
  if (typeof value !== "string")
    return { success: false, error: "Value was not string" } as const;

  let object;
  try {
    object = JSON.parse(value);
  } catch (error) {
    return { success: false, error } as const;
  }

  const result = CommentsSchema.safeParse(object);
  if (!result.success) return { success: false, error: result.error } as const;

  return { success: true, data: result.data } as const;
}

const VotesSchema = z.array(
  z.object({
    type: z.union([z.literal("upvote"), z.literal("downvote")]),
    commentId: z.number(),
  })
);

type Votes = z.infer<typeof VotesSchema>;
type Vote = Votes[number];

function parseVotes(value: unknown) {
  if (typeof value !== "string")
    return { success: false, error: "Value was not string" } as const;

  let object;
  try {
    object = JSON.parse(value);
  } catch (error) {
    return { success: false, error } as const;
  }

  const result = VotesSchema.safeParse(object);
  if (!result.success) return { success: false, error: result.error } as const;

  return { success: true, data: result.data } as const;
}

const CommentsContext = createContext<{
  comments: Comments;
  votes: Votes;
  create(content: string): void;
  upvote(data: { id: number; on: boolean }): void;
  downvote(data: { id: number; on: boolean }): void;
  reply(data: { id: number; content: string }): void;
  remove(id: number): void;
} | null>(null);

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useLocalStorage("comments");
  const [rawVotes, setRawVotes] = useLocalStorage("votes");
  const { user } = useUser();

  const voteResult = parseVotes(rawVotes);
  const votes = voteResult.success ? voteResult.data : [];

  const result = parseComments(item);
  const parsedComments = result.success ? result.data : initialComments;
  const comments = parsedComments.map((comment) => {
    const score = votes
      .filter((vote) => vote.commentId === comment.id)
      .reduce(
        (score, vote) => score + (vote.type === "upvote" ? 1 : -1),
        comment.score
      );
    return { ...comment, score };
  });

  const nextCommentId = Math.max(...comments.map((comment) => comment.id)) + 1;
  const nextReplyId =
    Math.max(
      ...comments.flatMap((comment) => comment.replies.map((reply) => reply.id))
    ) + 1;

  return (
    <CommentsContext.Provider
      value={{
        comments,
        votes,
        create(content) {
          setItem(
            JSON.stringify([
              ...comments,
              {
                content,
                // todo: Timestamp
                createdAt: "Just now",
                id: nextCommentId,
                score: 0,
                user,
                replies: [],
              } satisfies Comment,
            ])
          );
        },
        upvote({ id, on }) {
          const filteredVotes = votes.filter((vote) => vote.commentId !== id);
          const nextVotes = on
            ? [
                ...filteredVotes,
                { commentId: id, type: "upvote" } satisfies Vote,
              ]
            : filteredVotes;

          setRawVotes(JSON.stringify(nextVotes satisfies Votes));
        },
        downvote({ id, on }) {
          const filteredVotes = votes.filter((vote) => vote.commentId !== id);
          const nextVotes = on
            ? [
                ...filteredVotes,
                { commentId: id, type: "downvote" } satisfies Vote,
              ]
            : filteredVotes;

          setRawVotes(JSON.stringify(nextVotes satisfies Votes));
        },
        reply({ id, content }) {
          const comment = comments.find((comment) => comment.id === id);
          invariant(comment, "Comment not found");

          setItem(
            JSON.stringify(
              comments.map((c) =>
                c.id === comment.id
                  ? {
                      ...comment,
                      replies: [
                        ...comment.replies,
                        {
                          content,
                          // todo: Timestamp
                          createdAt: "Just now",
                          id: nextReplyId,
                          replyingTo: comment.user.username,
                          score: 0,
                          user,
                        },
                      ],
                    }
                  : c
              ) satisfies Comment[]
            )
          );
        },
        remove(id) {
          const comment = comments.find((comment) => comment.id === id);
          invariant(comment, "Comment not found");
          invariant(comment.user.username === user.username, "Forbidden");

          setItem(JSON.stringify(comments.filter((c) => c.id !== comment.id)));
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
