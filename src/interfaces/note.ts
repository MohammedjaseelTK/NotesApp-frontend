export type Category = "All" | "Work" | "Study" | "Personal" | "Ideas" | "Shopping";

export interface Note {
  id: number;
  title: string;
  content: string;
  category: Exclude<Category, "All">;
  created_at: string;
}