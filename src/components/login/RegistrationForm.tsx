import React, { type FormEvent, useEffect, type FC } from "react";
import { ELoginPage } from "@/pages/Login";
import { CustomButton } from "../UI/CustomButton";
import { useForm } from "@/hooks/useForm";
import { type TValidator } from "@/utils/validator";
import { TextField } from "../UI/form/TextField";
import { CheckBox } from "../UI/form/CheckBox";
import { useAuth } from "@/context/authContext";
import { useErrors } from "@/hooks/useErrors";
import { useNavigate } from "react-router-dom";

interface RegistrationProps {
   setLoginPage: (page: ELoginPage) => void;
}

interface IRegistrationState {
   email: string;
   password: string;
   isAdmin: boolean;
}

const initialData: IRegistrationState = {
   email: "",
   password: "",
   isAdmin: false,
};

const validatorConfig: TValidator<IRegistrationState> = {
   email: {
      isRequired: {
         message: "Введите email",
      },
      email: {
         message: "Неверный формат электронной почты",
      },
   },
   password: {
      isRequired: {
         message: "Введите пароль",
      },
      latinaAndNumeric: {
         message: "Пароль должен состоять из букв латинского алфавита и цифр",
      },
      minLength: {
         min: 7,
         message: "Минимальная длина пароля 7 букв",
      },
      maxLength: {
         max: 20,
         message: "Максимальная длина пароля 20 букв",
      },
      isCapitalSymbol: {
         message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isDigitSymbol: {
         message: "Пароль должен содержать хотя бы одну цифру",
      },
   },
};

export const RegistrationForm: FC<RegistrationProps> = ({ setLoginPage }) => {
   const { signUp } = useAuth();
   const navigate = useNavigate();
   const { data, changeHandler, errors, validate } = useForm({ initialData, validatorConfig });
   const { networkErrors, networkErrorHandler } = useErrors(data);

   const goToLogin = (): void => {
      setLoginPage(ELoginPage.login);
   };

   useEffect(() => {
      validate();
   }, [data]);

   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const isError = Object.keys(errors).length !== 0;
      if (isError) return;
      try {
         await signUp(data);
         navigate(-1);
      } catch (error: unknown) {
         networkErrorHandler(error);
      }
   };

   const isError = Object.keys(errors).length !== 0;

   return (
      <form onSubmit={handleSubmit}>
         <h1>Регистрация</h1>
         <TextField
            label={"Email"}
            value={data.email}
            onChange={(login) => changeHandler({ email: login })}
            error={errors.email ?? networkErrors.email}
         />
         <TextField
            label={"Пароль"}
            value={data.password}
            onChange={(password) => changeHandler({ password })}
            error={errors.password ?? networkErrors.password}
            type={"password"}
         />
         <CheckBox
            id="registration-admin"
            label="Администратор"
            onClick={() => changeHandler({ isAdmin: !data.isAdmin })}
         />
         <CustomButton disabled={isError} type="submit">
            Зарегистрироваться
         </CustomButton>
         <CustomButton onClick={goToLogin}> Перейти к авторизации</CustomButton>
      </form>
   );
};
