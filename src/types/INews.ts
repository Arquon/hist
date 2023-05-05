export interface INews {
   createdAt: number;
   title: string;
   description: string;
   content: string;
   id: string;
}

export type INewsWithoutId = Omit<INews, "id">;
export type INewsFormState = Omit<INews, "id" | "createdAt">;
