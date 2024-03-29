import { AdditionalContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { Loader } from "@/components/UI/Loader";
import { NewsForm } from "@/components/news/NewsForm";
import { useNews } from "@/context/newsContext";
import { type INewsFormState } from "@/types/INews";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";

interface NewsEditProps {}

export const NewsEditPage: FC<NewsEditProps> = ({}) => {
   const navigate = useNavigate();
   const { currentArticle, isLoadingNews, updateArticle } = useNews();

   const handleSubmit = async (data: INewsFormState): Promise<void> => {
      if (!currentArticle) return;
      await updateArticle({ ...currentArticle, ...data });
      navigate(`/news/${currentArticle.id}`);
   };

   if (!currentArticle || isLoadingNews) return <Loader />;

   return (
      <section className="news-form-page additional__page">
         <AdditionalContainer className="news-form-page__container">
            <NewsForm onSubmit={handleSubmit} submitLabel="Изменить новость" initialData={currentArticle}>
               <Heading className="news-form-page__heading additional__heading">Изменить новость</Heading>
            </NewsForm>
         </AdditionalContainer>
      </section>
   );
};

export default NewsEditPage;
