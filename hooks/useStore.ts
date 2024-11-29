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
   position: number;
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
      set((state) => {
         const newItem = {
            id: crypto.randomUUID(),
            ...item,
            subItems: [],
            position: state.items.length + 1,
         };
         return {
            items: [...state.items, newItem],
         };
      }),

   editItem: (id, updates) =>
      set((state) => {
         const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
         );

         const sortedItems = updatedItems.sort(
            (a, b) => a.position - b.position
         );
         return { items: sortedItems };
      }),

   deleteItem: (id) =>
      set((state) => {
         const filteredItems = state.items.filter((item) => item.id !== id);

         const sortedItems = filteredItems.sort(
            (a, b) => a.position - b.position
         );
         return { items: sortedItems };
      }),

   addSubItem: (parentId, subItem) => {
      set((state) => {
         const parentItem = state.items.find((item) => item.id === parentId);
         if (!parentItem)
            throw new Error("Nie znaleziono elementu nadrzędnego");

         const newSubItem = { id: crypto.randomUUID(), ...subItem };
         const updatedSubItems = [...(parentItem.subItems || []), newSubItem];

         const updatedItems = state.items.map((item) =>
            item.id === parentId ? { ...item, subItems: updatedSubItems } : item
         );

         return { items: updatedItems };
      });
   },

   editSubItem: (parentId, subItemId, name, link) =>
      set((state) => {
         const parentItem = state.items.find((item) => item.id === parentId);
         if (!parentItem) throw new Error("Nie znaleziono elementu");

         const updatedSubItems = parentItem.subItems.map((subItem) =>
            subItem.id === subItemId
               ? { ...subItem, menuName: name, menuLink: link }
               : subItem
         );

         const updatedItems = state.items.map((item) =>
            item.id === parentId ? { ...item, subItems: updatedSubItems } : item
         );

         return { items: updatedItems };
      }),

   deleteSubItem: (parentId, subItemId) =>
      set((state) => {
         const parentItem = state.items.find((item) => item.id === parentId);
         if (!parentItem) throw new Error("Nie znaleziono elementu");

         const updatedSubItems = parentItem.subItems.filter(
            (subItem) => subItem.id !== subItemId
         );

         const updatedItems = state.items.map((item) =>
            item.id === parentId ? { ...item, subItems: updatedSubItems } : item
         );

         return { items: updatedItems };
      }),
}));

export default useStore;
