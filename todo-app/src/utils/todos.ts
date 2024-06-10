import { invariant } from "@epic-web/invariant";
import { createId } from "@paralleldrive/cuid2";
import { useState } from "react";

const todos =
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
  const [items, setItems] = useState(todos);

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
  };
}
