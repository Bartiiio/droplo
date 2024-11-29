import useStore from "@/hooks/useStore";
import { ListItem } from "./ListItem";
import {
   DndContext,
   DragEndEvent,
   PointerSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useState } from "react";

export default function List() {
   const store = useStore();

   const [isDragging, setIsDragging] = useState(false);

   const sensors = useSensors(
      useSensor(PointerSensor, {
         activationConstraint: {
            distance: 0.1,
         },
      })
   );

   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
         console.log(store.items);
         const oldIndex = store.items.findIndex(
            (item) => item.id === active.id
         );
         const newIndex = store.items.findIndex((item) => item.id === over?.id);

         store.dndEditPosition(arrayMove(store.items, oldIndex, newIndex));
      }
      setIsDragging(false);
   };

   return (
      <div>
         <DndContext
            sensors={sensors}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            onDragStart={() => setIsDragging(true)}
         >
            <SortableContext items={store.items.map((item) => item.id)}>
               {store.items.map((element) => (
                  <ListItem
                     id={element.id}
                     key={element.id}
                     menuName={element.menuName}
                     menuLink={element.menuLink}
                     subitems={element.subItems}
                     isDragging={isDragging}
                  />
               ))}
            </SortableContext>
         </DndContext>
      </div>
   );
}
