export interface NewsItemView {
   createdAt: number;
   title: string;
   description: string;
   content: string;
   id: string;
}

export type NewsItemWithoutId = Omit<NewsItemView, "id">;
export type NewsItemFormState = Omit<NewsItemView, "id" | "createdAt">;
