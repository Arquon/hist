import React, { type FormEvent } from "react";
import { ELoginPage } from "@/pages/Login";
import { CustomButton } from "../UI/CustomButton";
import { type TValidator } from "@/utils/validator";
import { TextField } from "../UI/form/TextField";
import { CheckBox } from "../UI/form/CheckBox";
import { useNavigate } from "react-router-dom";
import { useFormWithNetworkErrors } from "@/hooks/useFormWithNetworkErrors";
import { signUpNetworkErrorsHandler } from "@/utils/errorHandlers";
import { useAuthActions } from "@/hooks/auth/useAuthActions";

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

export const RegistrationForm = ({ setLoginPage }: RegistrationProps) => {
   const { signUp } = useAuthActions();

   const navigate = useNavigate();
   const { data, changeHandler, hasError, errors, validateFields, validateForm, networkErrors, networkErrorHandler } =
      useFormWithNetworkErrors({
         initialData,
         validatorConfig,
      });

   const goToLogin = (): void => {
      setLoginPage(ELoginPage.login);
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const isError = validateForm();
      if (isError) return;
      try {
         await signUp(data);
         navigate(-1);
      } catch (error: unknown) {
         const parsedError = signUpNetworkErrorsHandler(error);
         networkErrorHandler(parsedError);
      }
   };

   const isError = hasError || Object.keys(networkErrors).length !== 0;

   return (
      <form onSubmit={handleSubmit}>
         <h1>Регистрация</h1>

         <div className="empty-form__fields">
            <TextField
               type="email"
               label={"Email"}
               value={data.email}
               onChange={(login) => changeHandler({ email: login })}
               errorData={{
                  error: errors.email ?? networkErrors.email,
                  validate: () => validateFields({ email: data.email }),
               }}
               prefix="empty-form"
            />
            <TextField
               label={"Пароль"}
               value={data.password}
               onChange={(password) => changeHandler({ password })}
               errorData={{
                  error: errors.password ?? networkErrors.password,
                  validate: () => validateFields({ password: data.password }),
               }}
               type={"password"}
               prefix="empty-form"
            />
            <CheckBox
               checked={data.isAdmin}
               id="registration-admin"
               label="Администратор"
               onClick={() => changeHandler({ isAdmin: !data.isAdmin })}
               className="empty-form__checkbox"
            />
         </div>

         <div className="empty-form__buttons-wrap">
            <CustomButton disabled={isError} type="submit" className="empty-form__btn">
               Зарегистрироваться
            </CustomButton>
            <CustomButton onClick={goToLogin} className="empty-form__btn">
               Авторизация
            </CustomButton>
         </div>
      </form>
   );
};
