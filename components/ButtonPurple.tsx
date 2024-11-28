import { GoPlusCircle } from "react-icons/go";

export default function ButtonPurple() {
   return (
      <div className="bg-custom-purple rounded-md py-3 px-4 space-x-1 flex justify-center items-center font-bold text-white cursor-pointer">
         <GoPlusCircle size={24} />
         <p className="pl-2">Dodaj pozycję menu</p>
      </div>
   );
}
