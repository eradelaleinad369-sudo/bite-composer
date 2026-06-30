import { create } from "zustand";
import type { MenuItem } from "./menu-data";

export type CartEntry = {
  uid: string;
  item: MenuItem;
};

type CartState = {
  entries: CartEntry[];
  name: string;
  add: (item: MenuItem) => void;
  remove: (uid: string) => void;
  clear: () => void;
  setName: (n: string) => void;
};

export const useCart = create<CartState>((set) => ({
  entries: [],
  name: "",
  add: (item) =>
    set((s) => ({
      entries: [...s.entries, { uid: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, item }],
    })),
  remove: (uid) => set((s) => ({ entries: s.entries.filter((e) => e.uid !== uid) })),
  clear: () => set({ entries: [] }),
  setName: (name) => set({ name }),
}));

export const cartTotal = (entries: CartEntry[]) =>
  entries.reduce((sum, e) => sum + e.item.price, 0);
