import React, { type FC, useEffect } from "react";
import { TextField } from "../UI/form/TextField";
import { AreaField } from "../UI/form/AreaField";
import { CustomButton } from "../UI/CustomButton";
import { type TValidator } from "@/functions/validator";
import { useForm } from "@/hooks/useForm";
import { type INewsFormState } from "@/types/INews";

interface NewsFormProps {
   onSubmit: (data: INewsFormState) => void;
   submitLabel: string;
   initialData?: INewsFormState;
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

export const NewsForm: FC<NewsFormProps> = ({ onSubmit, submitLabel, initialData }) => {
   const { data, changeHandler, errors, validate } = useForm({
      initialData: initialData ?? defaultData,
      validatorConfig,
   });

   const submitHandler = (): void => {
      const isError = validate();
      if (isError) return;
      onSubmit(data);
   };

   useEffect(() => {
      validate();
   }, [data]);

   return (
      <form>
         <TextField
            label="Название новости"
            value={data.title}
            error={errors.title}
            onChange={(title) => changeHandler({ title })}
         />
         <TextField
            label="Описание новости"
            value={data.description}
            error={errors.description}
            onChange={(description) => changeHandler({ description })}
         />
         <AreaField
            label="Содержание новости"
            value={data.content}
            error={errors.content}
            onChange={(content) => changeHandler({ content })}
         />
         <CustomButton onClick={submitHandler}>{submitLabel}</CustomButton>
      </form>
   );
};
