import { writable, Writable } from "svelte/store";

export interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const items: Writable<Item[]> = writable([]);
