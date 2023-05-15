import React, { type FormEvent, useEffect, type FC } from "react";
import { ELoginPage } from "@/pages/Login";
import { CustomButton } from "../UI/CustomButton";
import { useForm } from "@/hooks/useForm";
import { type TValidator } from "@/utils/validator";
import { TextField } from "../UI/form/TextField";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { useErrors } from "@/hooks/useErrors";

interface LoginFormProps {
   setLoginPage: (page: ELoginPage) => void;
}

interface LoginFormState {
   email: string;
   password: string;
}

const initialData: LoginFormState = {
   email: "",
   password: "",
};

const validatorConfig: TValidator<LoginFormState> = {
   email: {
      isRequired: {
         message: "Введите email",
      },
   },
   password: {
      isRequired: {
         message: "Введите пароль",
      },
   },
};

export const LoginForm: FC<LoginFormProps> = ({ setLoginPage }) => {
   const { signIn } = useAuth();
   const navigate = useNavigate();
   const { data, changeHandler, validate, errors } = useForm({ initialData, validatorConfig });
   const { networkErrors, networkErrorHandler } = useErrors(data);

   const goToRegistration = (): void => {
      setLoginPage(ELoginPage.register);
   };

   useEffect(() => {
      validate();
   }, [data]);

   const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const isError = validate();
      if (isError) return;
      try {
         await signIn(data);
         navigate(-1);
      } catch (error: unknown) {
         networkErrorHandler(error);
      }
   };

   const isError = Object.keys(errors).length !== 0 || Object.keys(networkErrors).length !== 0;

   return (
      <form onSubmit={submitHandler}>
         <h1>Авторизация</h1>
         <TextField
            label="Email"
            value={data.email}
            onChange={(login) => changeHandler({ email: login })}
            error={errors.email ?? networkErrors.email}
         />
         <TextField
            label="пароль"
            value={data.password}
            onChange={(password) => changeHandler({ password })}
            error={errors.password ?? networkErrors.password}
            type={"password"}
         />
         <CustomButton type="submit" disabled={isError}>
            Войти
         </CustomButton>
         {networkErrors.global && <p>{networkErrors.global}</p>}
         <CustomButton onClick={goToRegistration} type="button">
            Перейти к регистрации
         </CustomButton>
      </form>
   );
};
