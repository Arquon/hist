import React, { type FC, type FormEvent, type ReactNode } from "react";
import { TextField } from "../UI/form/TextField";
import { AreaField } from "../UI/form/AreaField";
import { CustomButton } from "../UI/CustomButton";
import { type TValidator } from "@/utils/validator";
import { type INewsFormState } from "@/types/INews";
import { useFormWithNetworkErrors } from "@/hooks/useFormWithNetworkErrors";

interface NewsFormProps {
   onSubmit: (data: INewsFormState) => void | Promise<void>;
   submitLabel: string;
   initialData?: INewsFormState;
   children?: ReactNode;
}

const defaultData: INewsFormState = {
   title: "",
   description: "",
   content: "",
};

const validatorConfig: TValidator<INewsFormState> = {
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

export const NewsForm: FC<NewsFormProps> = ({ onSubmit, submitLabel, initialData, children }) => {
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
      } catch (e) {
         networkErrorHandler(e);
      }
   };

   const isError = hasError || Object.keys(networkErrors).length !== 0;

   return (
      <div className="news-form-page__form news-form">
         <form onSubmit={submitHandler}>
            {children}

            <div className="news-form__fields">
               <TextField
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
