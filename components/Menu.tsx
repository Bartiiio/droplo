import Button from "./ButtonPurple";

export default function Menu() {
   return (
      <div className="w-full py-6 px-4 gap-2 rounded-md mt-[30px] border-[1px] border-border-default flex items-center justify-center bg-background-grey">
         <div className="text-center">
            <h2 className="text-text-button-black font-sans my-2 font-bold">
               Menu jest puste
            </h2>
            <p className="mb-6">W tym menu nie ma jeszcze żadnych linków.</p>
            <Button />
         </div>
      </div>
   );
}
