import { arrayMove } from "@dnd-kit/sortable";
import { invariant } from "@epic-web/invariant";
import { createId } from "@paralleldrive/cuid2";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useMemo } from "react";
import { z } from "zod";

const todosKey = "todos";

const todosSchema = z.array(
  z.object({
    id: z.string(),
    text: z.string(),
    completed: z.boolean(),
  })
);

export type Todos = z.infer<typeof todosSchema>;
export type Todo = Todos[number];

const todos: Todos =
  process.env.NODE_ENV === "test"
    ? []
    : [
        { id: "1", text: "Complete online JavaScript course", completed: true },
        { id: "2", text: "Jog around the park 3x", completed: false },
        { id: "3", text: "10 minutes meditation", completed: false },
        { id: "4", text: "Read for 1 hour", completed: false },
        { id: "5", text: "Pick up groceries", completed: false },
        {
          id: "6",
          text: "Complete Todo App on Frontend Mentor",
          completed: false,
        },
      ];

export function useTodos() {
  const [json, setItems] = useLocalStorage<unknown>(todosKey, todos);
  const items = useMemo(() => todosSchema.parse(json), [json]);

  return {
    items,
    addTodo(text: string) {
      invariant(text.trim().length, "Text consists of only whitespaces");

      setItems([...items, { completed: false, id: createId(), text }]);
    },
    toggleTodo(id: string, completed: boolean) {
      setItems(
        items.map((item) => (item.id === id ? { ...item, completed } : item))
      );
    },
    deleteTodo(id: string) {
      setItems(items.filter((item) => item.id !== id));
    },
    clearCompleted() {
      setItems(items.filter((item) => !item.completed));
    },
    toggleTodos() {
      if (items.some((item) => !item.completed)) {
        setItems(items.map((item) => ({ ...item, completed: true })));
      } else {
        setItems(items.map((item) => ({ ...item, completed: false })));
      }
    },
    reorder(from: number, to: number) {
      setItems(arrayMove(items, from, to));
    },
  };
}
