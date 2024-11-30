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
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export default function List() {
   const store = useStore();
   const inputRef = store.inputRef;

   const fucusInputClick = () => {
      if (inputRef) {
         inputRef.focus();
         window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
         });
      }
   };

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
         const oldIndex = store.items.findIndex(
            (item) => item.id === active.id
         );
         const newIndex = store.items.findIndex((item) => item.id === over?.id);

         store.dndEditPosition(arrayMove(store.items, oldIndex, newIndex));
      }
      setIsDragging(false);
      toast.success("Zmieniono kolejność elementów");
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
         <div className=" bottom-2 inline-block w-full mt-6">
            <Button
               onClick={fucusInputClick}
               className="border-border-default border-2 text-black bg-transparent hover:bg-transparent"
            >
               Dodaj więcej pozycji...
            </Button>
         </div>
      </div>
   );
}
