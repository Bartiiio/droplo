import useStore from "@/hooks/useStore";
import { ListItem } from "./ListItem";
import {
   DndContext,
   DragEndEvent,
   PointerSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export default function List() {
   const store = useStore();

   const sensors = useSensors(
      useSensor(PointerSensor, {
         activationConstraint: {
            distance: 0.1,
         },
      })
   );

   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      const activeItemId = active.id as string;
      const overItemId = over.id as string;
      console.log("Active item:", activeItemId);
      console.log("Over item:", overItemId);

      const items = useStore.getState().items;

      const activeItem = items.find((item) => item.id === activeItemId);
      const overItem = items.find((item) => item.id === overItemId);

      if (!activeItem || !overItem) return;

      if (activeItem.id !== overItem.id) {
         const activeItemIndex = items.findIndex(
            (item) => item.id === activeItem.id
         );
         const overItemIndex = items.findIndex(
            (item) => item.id === overItem.id
         );

         useStore.getState().editItem(activeItem.id, {
            position: overItemIndex + 1,
         });
         useStore.getState().editItem(overItem.id, {
            position: activeItemIndex + 1,
         });
      } else {
         const activeSubItem = activeItem.subItems?.find(
            (subItem) => subItem.id === activeItemId
         );
         const overSubItem = overItem.subItems?.find(
            (subItem) => subItem.id === overItemId
         );

         if (activeSubItem && overSubItem) {
            useStore
               .getState()
               .editSubItem(
                  activeItem.id,
                  activeSubItem.id || "",
                  activeSubItem.menuName || "",
                  activeSubItem.menuLink || ""
               );
            useStore
               .getState()
               .editSubItem(
                  activeItem.id,
                  overSubItem.id || "",
                  overSubItem.menuName || "",
                  overSubItem.menuLink || ""
               );
         }
      }
   };

   return (
      <div>
         <DndContext
            sensors={sensors}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
         >
            <SortableContext items={store.items.map((item) => item.id)}>
               {store.items
                  .slice()
                  .reverse()
                  .map((element) => (
                     <ListItem
                        id={element.id}
                        key={element.id}
                        menuName={element.menuName}
                        menuLink={element.menuLink}
                        subitems={element.subItems}
                     />
                  ))}
            </SortableContext>
         </DndContext>
      </div>
   );
}
