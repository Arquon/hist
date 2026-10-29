import { AdditionalContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { Loader } from "@/components/UI/Loader";
import { NewsForm } from "@/components/news/NewsForm";
import { AdminRequire } from "@/hoc/AdminRequire";
import { useFetchNews } from "@/hooks/news/useFetchNews";
import { useNewsActions } from "@/hooks/news/useNewsActions";
import { type NewsItemFormState } from "@/types/news";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface NewsEditProps {}

const NewsEditPageComponent = ({}: NewsEditProps) => {
   const navigate = useNavigate();
   const { newsId } = useParams<{ newsId: string }>();

   const { currentArticle, isLoadingNews } = useFetchNews({ newsId });
   const { updateArticle } = useNewsActions();

   const handleSubmit = async (data: NewsItemFormState): Promise<void> => {
      if (!currentArticle) return;
      await updateArticle({ ...currentArticle, ...data });
      navigate(`/news/${currentArticle.id}`);
   };

   if (!currentArticle || isLoadingNews) return <Loader />;

   return (
      <section className="news-form-page additional__page">
         <AdditionalContainer className="news-form-page__container">
            <NewsForm
               onSubmit={handleSubmit}
               submitLabel="Изменить новость"
               initialData={currentArticle}
               networkErrorsMessages={{
                  _401: {
                     unauthorized: "Для обновления новости нужны права администратора",
                  },
               }}
            >
               <Heading className="news-form-page__heading additional__heading">Изменить новость</Heading>
            </NewsForm>
         </AdditionalContainer>
      </section>
   );
};

export const NewsEditPage = ({}) => (
   <AdminRequire redirectPath="/news">
      <NewsEditPageComponent />
   </AdminRequire>
);

export default NewsEditPage;
