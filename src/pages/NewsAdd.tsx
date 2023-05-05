import { NarrowContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { NewsForm } from "@/components/news/NewsForm";
import { useNews } from "@/hooks/useNews";
import { type INewsFormState } from "@/types/INews";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";

interface NewsAddProps {}

export const NewsAdd: FC<NewsAddProps> = ({}) => {
   const { addArticle } = useNews();
   const navigate = useNavigate();

   const handleSubmit = async (data: INewsFormState): Promise<void> => {
      const article = await addArticle(data);
      navigate(`/news/${article.id}`);
   };

   return (
      <section className="news-form-page">
         <NarrowContainer className="news-form-page__container">
            <Heading className="news-form-page__heading">Добавление новостей</Heading>
            <NewsForm onSubmit={handleSubmit} submitLabel="Добавить новость" />
         </NarrowContainer>
      </section>
   );
};
