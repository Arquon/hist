import { NarrowContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { NewsForm } from "@/components/news/NewsForm";
import { AdminRequire } from "@/hoc/AdminRequire";
import { useNews } from "@/hooks/useNews";
import { type NewsItemFormState } from "@/types/news";
import React from "react";
import { useNavigate } from "react-router-dom";

interface NewsAddProps {}

const NewsAddPageComponent = ({}: NewsAddProps) => {
   const { addArticle } = useNews();
   const navigate = useNavigate();

   const handleSubmit = async (data: NewsItemFormState): Promise<void> => {
      try {
         const article = await addArticle(data);
         navigate(`/news/${article.id}`);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <section className="news-form-page additional__page">
         <NarrowContainer className="news-form-page__container">
            <NewsForm
               onSubmit={handleSubmit}
               submitLabel="Добавить новость"
               networkErrorsMessages={{
                  _401: {
                     unauthorized: "Для добавления новости нужны права администратора",
                  },
               }}
            >
               <Heading className="news-form-page__heading">Добавление новости</Heading>
            </NewsForm>
         </NarrowContainer>
      </section>
   );
};

export const NewsAddPage = () => (
   <AdminRequire redirectPath="/news">
      <NewsAddPageComponent />
   </AdminRequire>
);

export default NewsAddPage;
