import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { HTMLAttributes, ReactNode, useState } from "react";
import { TodoPresentation } from "./todo";
import { invariant } from "@epic-web/invariant";
import { Todo } from "../utils/todos";

interface TodosProps extends HTMLAttributes<HTMLOListElement> {
  children: ReactNode;
  items: { completed: boolean; id: string; text: string }[];
  onReorder(from: number, to: number): void;
}

export function Todos({ items, onReorder, ...props }: TodosProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  let activeTodo: Todo | undefined;
  if (activeId !== null) {
    activeTodo = items.find((item) => item.id === activeId);
    invariant(activeTodo, `Couldn't find item with ID "${activeId}"`);
  }

  return (
    <DndContext
      onDragStart={(e) => {
        invariant(
          typeof e.active.id === "string",
          "Expected ID to be of type string"
        );
        setActiveId(e.active.id);
      }}
      onDragEnd={(e) => {
        setActiveId(null);

        const { active, over } = e;
        if (!over) return;

        if (active.id !== over.id) {
          const from = items.findIndex((item) => item.id === active.id);
          invariant(
            from !== -1,
            `Item with ID ${active.id} not found in items`
          );

          const to = items.findIndex((item) => item.id === over.id);
          invariant(to !== -1, `Item with ID ${over.id} not found in items`);

          onReorder(from, to);
        }
      }}
      collisionDetection={closestCenter}
      sensors={sensors}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ol role="list" {...props} />
      </SortableContext>
      <DragOverlay>
        {activeTodo ? <TodoPresentation {...activeTodo} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
