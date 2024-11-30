import useStore from "@/hooks/useStore";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

type FormValues = {
   menuName: string;
   menuLink: string;
};

export default function ListAdd() {
   const store = useStore();

   const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
   } = useForm<FormValues>();

   const onSubmit = (data: FormValues) => {
      try {
         store.addItem(data);

         reset();
         toast.success("Pomyślnie dodano!");
      } catch {
         toast.error("Wystąpił błąd");
      }
   };

   const menuLinkValue = watch("menuLink", "");

   return (
      <motion.div
         initial={{ x: "-100%", opacity: 0 }}
         animate={{ x: "0%", opacity: 1 }}
         transition={{
            duration: 0.3,
            ease: "easeOut",
         }}
      >
         <form
            id="addElement"
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 m-6 rounded-md bg-white font-bold"
         >
            <h1 className="text-2xl mb-4">Nazwa</h1>

            <h2 className="mb-1">Menu</h2>
            <input
               type="text"
               placeholder="np. Menu główne"
               className={`border p-2 rounded-md w-full mb-2 ${
                  errors.menuName ? "border-red-500" : "border-border-default"
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
               <p className="text-red-500 text-sm">{errors.menuName.message}</p>
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
                  className={`border mt2 p-2 rounded-md w-full ${
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
                        message: "Minimalna długość nazwy to 3 znaki!",
                     },
                  })}
               />
            </div>
            {errors.menuLink && (
               <p className="text-red-500 text-sm mt-2">
                  {errors.menuLink.message}
               </p>
            )}
         </form>
      </motion.div>
   );
}
