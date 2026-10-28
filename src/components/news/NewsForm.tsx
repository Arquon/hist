import React, { type FormEvent, type ReactNode } from "react";
import { TextField } from "../UI/form/TextField";
import { AreaField } from "../UI/form/AreaField";
import { CustomButton } from "../UI/CustomButton";
import { type TValidator } from "@/utils/validator";
import { useFormWithNetworkErrors } from "@/hooks/useFormWithNetworkErrors";
import { type NewsItemFormState } from "@/types/news";
import { type NetworkErrors, newsNetworkErrorsHandler } from "@/services/errors/default";
import { type DeepPartial } from "@/types/common";

interface NewsFormProps {
   onSubmit: (data: NewsItemFormState) => void | Promise<void>;
   networkErrorsMessages?: DeepPartial<NetworkErrors>;
   submitLabel: string;
   initialData?: NewsItemFormState;
   children?: ReactNode;
}

const defaultData: NewsItemFormState = {
   title: "",
   description: "",
   content: "",
};

const validatorConfig: TValidator<NewsItemFormState> = {
   title: {
      isRequired: { message: "Заголовок обязателен к заполнению" },
   },
   description: {
      isRequired: { message: "Описание обязательно к заполнению" },
   },
   content: {
      isRequired: { message: "Содержание обязательно к заполнению" },
   },
};

export const NewsForm = ({ onSubmit, submitLabel, initialData, children, networkErrorsMessages }: NewsFormProps) => {
   const { data, changeHandler, hasError, errors, validateFields, validateForm, networkErrors, networkErrorHandler } =
      useFormWithNetworkErrors({
         initialData: initialData ?? defaultData,
         validatorConfig,
      });

   const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const isError = validateForm();
      if (isError) return;
      try {
         await onSubmit(data);
      } catch (error) {
         const parsedError = newsNetworkErrorsHandler(error, networkErrorsMessages);
         networkErrorHandler(parsedError);
      }
   };

   const isError = hasError || Object.keys(networkErrors).length !== 0;

   return (
      <div className="news-form-page__form news-form">
         <form onSubmit={submitHandler}>
            {children}

            <div className="news-form__fields">
               <TextField
                  type="text"
                  label="Название новости"
                  value={data.title}
                  errorData={{
                     error: errors.title ?? networkErrors.title,
                     validate: () => validateFields({ title: data.title }),
                  }}
                  onChange={(title) => changeHandler({ title })}
                  prefix="news-form"
               />
               <TextField
                  type="text"
                  label="Описание новости"
                  value={data.description}
                  errorData={{
                     error: errors.description ?? networkErrors.description,
                     validate: () => validateFields({ description: data.description }),
                  }}
                  onChange={(description) => changeHandler({ description })}
                  prefix="news-form"
               />
               <AreaField
                  label="Содержание новости"
                  value={data.content}
                  errorData={{
                     error: errors.content ?? networkErrors.content,
                     validate: () => validateFields({ content: data.content }),
                  }}
                  onChange={(content) => changeHandler({ content })}
                  prefix="news-form"
               />
            </div>
            <CustomButton className="news-form__btn" type="submit" disabled={isError}>
               {submitLabel}
            </CustomButton>
         </form>
      </div>
   );
};
