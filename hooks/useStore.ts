import { create } from "zustand";

export type SubItem = {
   id?: string;
   menuLink?: string;
   menuName?: string;
};

type MenuItem = {
   id: string;
   menuName: string;
   menuLink: string;
   subItems: SubItem[];
};

type StoreState = {
   items: MenuItem[];
   addItem: (item: Omit<MenuItem, "id" | "subItems">) => void;
   editItem: (
      id: string,
      updates: Partial<Omit<MenuItem, "id" | "subItems">>
   ) => void;
   deleteItem: (id: string) => void;
   addSubItem: (parentId: string, subItem: Omit<SubItem, "id">) => void;
   editSubItem: (
      parentId: string,
      subItemId: string,
      name: string,
      link: string
   ) => void;
   deleteSubItem: (parentId: string, subItemId: string) => void;
};

const useStore = create<StoreState>((set) => ({
   items: [],

   addItem: (item) =>
      set((state) => ({
         items: [
            ...state.items,
            {
               id: crypto.randomUUID(),
               ...item,
               subItems: [],
               position: state.items.length + 1,
            },
         ],
      })),

   editItem: (id, updates) =>
      set((state) => ({
         items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
         ),
      })),

   deleteItem: (id) =>
      set((state) => ({
         items: state.items.filter((item) => item.id !== id),
      })),

   addSubItem: (parentId, subItem) => {
      set((state) => {
         const parentItem = state.items.find((item) => item.id === parentId);

         if (!parentItem) {
            throw new Error("Nie znaleziono elementu nadrzędnego");
         }

         if (parentItem.subItems?.length >= 1) {
            throw new Error("Osiągnięto maksymalną liczbę podelementów");
         }

         return {
            items: state.items.map((item) =>
               item.id === parentId
                  ? {
                       ...item,
                       subItems: [
                          ...(item.subItems || []),
                          { id: crypto.randomUUID(), ...subItem },
                       ],
                    }
                  : item
            ),
         };
      });
   },

   editSubItem: (parentId, subItemId, name, link) =>
      set((state) => {
         const parentItem = state.items.find((item) => item.id === parentId);
         if (!parentItem) {
            throw new Error("Nie znaleziono elementu");
         }
         const subItem = parentItem.subItems.find((s) => s.id === subItemId);
         if (!subItem) {
            throw new Error("Nie znaleziono podelementu");
         }
         return {
            items: state.items.map((item) =>
               item.id === parentId
                  ? {
                       ...item,
                       subItems: item.subItems.map((subItem) =>
                          subItem.id === subItemId
                             ? { ...subItem, menuName: name, menuLink: link }
                             : subItem
                       ),
                    }
                  : item
            ),
         };
      }),

   deleteSubItem: (parentId, subItemId) =>
      set((state) => {
         const parentItem = state.items.find((item) => item.id === parentId);
         if (!parentItem) {
            throw new Error("Nie znaleziono elementu nadrzędnego");
         }
         if (!parentItem.subItems.find((subItem) => subItem.id === subItemId)) {
            throw new Error("Nie znaleziono podelementu");
         }
         return {
            items: state.items.map((item) =>
               item.id === parentId
                  ? {
                       ...item,
                       subItems: item.subItems.filter(
                          (subItem) => subItem.id !== subItemId
                       ),
                    }
                  : item
            ),
         };
      }),
}));

export default useStore;
