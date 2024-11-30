import useStore from "@/hooks/useStore";
import { GoPlusCircle } from "react-icons/go";

export default function ButtonPurple() {
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
   return (
      <div
         onClick={fucusInputClick}
         className="bg-custom-purple rounded-md py-3 px-4 space-x-1 flex justify-center items-center font-bold text-white cursor-pointer"
      >
         <GoPlusCircle size={24} />
         <p className="pl-2">Dodaj pozycję menu</p>
      </div>
   );
}
