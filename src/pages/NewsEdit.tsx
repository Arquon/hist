import { NarrowContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { Loader } from "@/components/UI/Loader";
import { NewsForm } from "@/components/news/NewsForm";
import { useNews } from "@/hooks/useNews";
import { type INewsFormState } from "@/types/INews";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";

interface NewsEditProps {}

export const NewsEdit: FC<NewsEditProps> = ({}) => {
   const navigate = useNavigate();
   const { currentArticle, isLoadingNews, updateArticle } = useNews();

   const handleSubmit = async (data: INewsFormState): Promise<void> => {
      if (!currentArticle) return;
      await updateArticle({ ...currentArticle, ...data });
      navigate(`/news/${currentArticle.id}`);
   };

   if (!currentArticle || isLoadingNews) return <Loader />;

   return (
      <section className="news-form-page">
         <NarrowContainer className="news-form-page__container">
            <Heading className="news-form-page__heading">Изменить новость</Heading>
            <NewsForm
               onSubmit={handleSubmit}
               submitLabel="Изменить новость"
               initialData={currentArticle}
            />
         </NarrowContainer>
      </section>
   );
};
