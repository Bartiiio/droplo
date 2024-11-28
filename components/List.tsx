import useStore from "@/hooks/useStore";
import { ListItem } from "./ListItem";

export default function List() {
   const store = useStore();

   return (
      <div className="">
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
      </div>
   );
}
