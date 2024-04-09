import { useLocalStorage } from "./local-storage";
import { comments as initialComments } from "../data/data.json";
import { z } from "zod";
import { useUser } from "./user";

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

export type Comment = z.infer<typeof CommentsSchema>[number];
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

export function useComments() {
  const [item, setItem] = useLocalStorage("comments");
  const { user } = useUser();

  const result = parseComments(item);
  const comments = result.success ? result.data : initialComments;

  const nextId = Math.max(...comments.map((comment) => comment.id)) + 1;

  return {
    comments,
    create(content: string) {
      setItem(
        JSON.stringify([
          ...comments,
          {
            content,
            // todo: Timestamp
            createdAt: "Just now",
            id: nextId,
            score: 0,
            user,
            replies: [],
          } satisfies Comment,
        ])
      );
    },
  };
}