"use client";
import Menu from "@/components/Menu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import ListAdd from "@/components/ListAdd";
import useStore from "@/hooks/useStore";
import List from "@/components/List";
import toast from "react-hot-toast";

export default function Home() {
   const store = useStore();
   return (
      <div className="bg-background-grey mt-6 rounded-md mb-12 pb-4 max-w-[1208px] mx-auto">
         <div className="flex items-center ml-8 pt-6 mb-4">
            <span className="mr-2 text-2xl">
               <IoMdArrowRoundBack />
            </span>
            <p className="text-xl">Wróć do listy nawigacji</p>
         </div>

         <h1 className="font-bold text-4xl p-2 ml-3">Dodaj nawigację</h1>

         <ListAdd />

         <div className="p-2 flex justify-end mr-4 gap-2 pb-4">
            <Button
               onClick={() => toast.error("Anulowano!")}
               type="reset"
               form="addElement"
               className="bg-white hover:bg-white text-text-button-black font-bold hover:text-red-500"
            >
               Anuluj
            </Button>
            <Button
               type="submit"
               form="addElement"
               className="bg-white hover:bg-white text-text-button-purple border-purple-200 border-2 font-bold hover:text-green-500"
            >
               Dodaj
            </Button>
         </div>

         <div className="p-8 m-6 rounded-md bg-white">
            <h1 className="font-bold text-2xl mb-4">Pozycje menu</h1>
            {store.items.length ? <List /> : <Menu />}
         </div>
      </div>
   );
}
