import type { Item } from "./stores";

export class TodoApi {
  static async getAll(): Promise<Item[]> {
    return JSON.parse(localStorage.getItem("todo-list") || "[]");
  }

  static async save(items: Item[]) {
    localStorage.setItem("todo-list", JSON.stringify(items));
  }
}
