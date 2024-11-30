import { Button } from "@/components/ui/button";
import { IoIosMove } from "react-icons/io";
import useStore, { SubItem } from "@/hooks/useStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import DialogWindow from "./DialogWindow";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ListItemProps {
   id: string;
   menuName: string;
   menuLink: string;
   subitems?: SubItem[];
   isDragging: boolean;
}

type FormValues = {
   menuName: string;
   menuLink: string;
};

export function ListItem({
   id,
   menuName,
   menuLink,
   isDragging,
   subitems = [],
}: ListItemProps) {
   const store = useStore();

   const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: id });

   const [openDialog, setOpenDialog] = useState(false);
   const [edit, setEdit] = useState(false);
   const [submenu, setSubmenu] = useState(false);
   const [editingSubItemId, setEditingSubItemId] = useState<string | undefined>(
      undefined
   );
   const [subItemToDelete, setSubItemToDelete] = useState<string | undefined>(
      undefined
   );

   const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
   } = useForm<FormValues>();

   const menuLinkValue = watch(
      "menuLink",
      store.items.find((item) => item.id === id)?.menuLink || ""
   );

   const handleDeleteItem = () => {
      store.deleteItem(id);
      toast.success("Usunięto!");
      setOpenDialog(false);
   };

   const handleDeleteSubItem = () => {
      if (subItemToDelete) {
         store.deleteSubItem(id, subItemToDelete);
         toast.success("Usunięto podpozycję!");
         setOpenDialog(false);
      }
   };

   const shortenLink = (
      link: string | undefined | null,
      maxLength: number = 50,
      defaultValue: string = ""
   ): string => {
      return link && link.length > maxLength
         ? `${link.substring(0, maxLength)}...`
         : link || defaultValue;
   };

   const onSubmit = async (
      data: FormValues,
      isSubmenu: boolean = false,
      subItemId?: string
   ) => {
      try {
         if (isSubmenu) {
            if (subItemId) {
               store.editSubItem(id, subItemId, data.menuName, data.menuLink);
            } else {
               store.addSubItem(id, {
                  menuName: data.menuName,
                  menuLink: data.menuLink,
               });
            }
            toast.success(
               isSubmenu
                  ? "Pomyślnie edytowano podpozycję!"
                  : "Pomyślnie dodano podpozycję!"
            );
         } else {
            store.editItem(id, data);
            toast.success("Pomyślnie edytowano!");
         }
         reset();
         setEdit(false);
         setSubmenu(false);
         setEditingSubItemId(undefined);
      } catch (error: unknown) {
         if (error instanceof Error) {
            toast.error(error.message);
         } else {
            toast.error("Wystąpił błąd");
         }
      }
   };

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   return (
      <>
         <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <div className="flex items-center justify-between border-border-default border-2 rounded-md p-2 mt-6 relative">
               <div className="flex items-center p-3">
                  <IoIosMove
                     size={24}
                     className="ml-4 text-center cursor-move"
                  />
                  <div className="ml-6 flex-col">
                     <p className="font-bold py-2">{menuName}</p>
                     <a href={menuLink} className="text-link py-2">
                        {shortenLink(menuLink)}
                     </a>
                  </div>
               </div>
               <div className="mx-4 border-2 text-text-button-dark font-bold rounded-lg flex">
                  <button
                     onClick={() => setOpenDialog(true)}
                     className="px-3 py-2"
                  >
                     Usuń
                  </button>
                  <button
                     onClick={() => setEdit((prevState) => !prevState)}
                     className="relative px-3 py-2 h-full border-x-2"
                  >
                     Edytuj
                  </button>
                  <button
                     disabled={subitems.length > 0}
                     onClick={() => setSubmenu((prevState) => !prevState)}
                     className={`px-3 py-2 ${
                        subitems.length > 0 ? "cursor-not-allowed" : ""
                     }`}
                  >
                     Dodaj podpozycję menu
                  </button>
               </div>
            </div>
            {subitems.length > 0 && (
               <div
                  className={`flex flex-col ml-16 border-2 border-border-default rounded-md p-2 border-t-0 ${
                     isDragging ? "absolute opacity-0" : ""
                  }`}
               >
                  {subitems.map((element) => (
                     <div
                        className="flex items-center p-3 pr-0 w-full justify-between"
                        key={element.id}
                     >
                        <div className="ml-6 flex-col">
                           <p className="font-bold py-2">{element.menuName}</p>
                           <a
                              href={element.menuLink}
                              className="text-link py-2"
                           >
                              {shortenLink(element.menuLink)}
                           </a>
                        </div>
                        <div className="mx-4 border-2 text-text-button-dark font-bold rounded-lg flex">
                           <button
                              onClick={() => {
                                 setSubItemToDelete(element.id);
                                 setOpenDialog(true);
                              }}
                              className="px-3 py-2"
                           >
                              Usuń
                           </button>

                           <button
                              onClick={() => {
                                 setSubmenu(!submenu);
                                 setEditingSubItemId(element.id || undefined);
                              }}
                              className="relative px-3 py-2 h-full border-l-2"
                           >
                              Edytuj
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

         {(edit || submenu) && (
            <div>
               <h1 className="text-xl font-bold ml-4 mt-4">
                  {subitems.length > 0 ? "Edytuj podpozycję " : ""}
                  {subitems.length == 0 ? "Dodaj podpozycję" : ""}
                  {edit ? "Edytuj pozycję" : ""}
               </h1>
               <form
                  onSubmit={handleSubmit((data) =>
                     onSubmit(data, submenu, editingSubItemId)
                  )}
                  className="p-8 m-6 rounded-md bg-background-grey font-bold"
               >
                  <h2 className="mb-1">Menu</h2>
                  <input
                     type="text"
                     placeholder="np. Menu główne"
                     className={`border p-2 rounded-md w-full mb-2 ${
                        errors.menuName
                           ? "border-red-500"
                           : "border-border-default"
                     }`}
                     {...register("menuName", {
                        required: "Pole jest wymagane",
                        minLength: {
                           value: 3,
                           message: "Minimalna długość nazwy to 3 znaki!",
                        },
                     })}
                  />
                  {errors.menuName && (
                     <p className="text-red-500 text-sm">
                        {errors.menuName.message}
                     </p>
                  )}

                  <h2 className="mb-1 mt-3">Link</h2>
                  <div className="relative">
                     {menuLinkValue === "" && (
                        <CiSearch
                           className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 font-bold"
                           size={24}
                        />
                     )}
                     <input
                        type="text"
                        placeholder="Wklej lub wyszukaj"
                        className={`border p-2 rounded-md w-full ${
                           menuLinkValue === "" ? "pl-10" : ""
                        } ${
                           errors.menuLink
                              ? "border-red-500"
                              : "border-border-default"
                        }`}
                        {...register("menuLink", {
                           required: "Pole jest wymagane",
                           minLength: {
                              value: 3,
                              message: "Minimalna długość linku to 3 znaki!",
                           },
                        })}
                     />
                  </div>
                  {errors.menuLink && (
                     <p className="text-red-500 text-sm mt-2">
                        {errors.menuLink.message}
                     </p>
                  )}

                  <div className="mt-6 gap-5 flex justify-end">
                     <Button
                        onClick={() => {
                           setEdit(false);
                           setSubmenu(false);
                           setEditingSubItemId(undefined);
                           reset();
                        }}
                        className="bg-white hover:bg-white p-4 text-text-button-black font-bold hover:text-red-500"
                        type="reset"
                     >
                        Anuluj
                     </Button>
                     <Button
                        className="bg-white hover:bg-white text-text-button-purple border-purple-300 border-2 font-bold hover:text-green-500 p-4"
                        type="submit"
                     >
                        Zapisz
                     </Button>
                  </div>
               </form>
            </div>
         )}

         <DialogWindow
            isOpen={openDialog}
            onClose={() => setOpenDialog(false)}
            onConfirm={subItemToDelete ? handleDeleteSubItem : handleDeleteItem}
            title="Potwierdzenie usunięcia"
            description="Czy na pewno chcesz usunąć ten element? Akcja jest nieodwracalna."
         />
      </>
   );
}
