import React, { type FormEvent } from "react";
import { ELoginPage } from "@/pages/Login";
import { CustomButton } from "../UI/CustomButton";
import { type TValidator } from "@/utils/validator";
import { TextField } from "../UI/form/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormWithNetworkErrors } from "@/hooks/useFormWithNetworkErrors";
import { useAuthActions } from "@/hooks/auth/useAuthActions";
import { signInNetworkErrorsHandler } from "@/services/errors/auth";

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
      email: {
         message: "Введите корректный email",
      },
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

export const LoginForm = ({ setLoginPage }: LoginFormProps) => {
   const { signIn } = useAuthActions();
   const navigate = useNavigate();
   const location = useLocation();

   const { data, changeHandler, hasError, errors, validateFields, validateForm, networkErrors, networkErrorHandler } =
      useFormWithNetworkErrors({
         initialData,
         validatorConfig,
      });

   const goToRegistration = (): void => {
      setLoginPage(ELoginPage.register);
   };

   const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const isError = validateForm();
      if (isError) return;

      try {
         await signIn(data);
         const from = location.state?.from;
         navigate({ pathname: from ? from.pathname : "/" });
      } catch (error: unknown) {
         const parsedError = signInNetworkErrorsHandler(error);
         networkErrorHandler(parsedError);
      }
   };

   return (
      <form onSubmit={submitHandler}>
         <h1>Авторизация</h1>

         <div className="empty-form__fields">
            <TextField
               type="email"
               label="Email"
               value={data.email}
               onChange={(login) => changeHandler({ email: login })}
               errorData={{
                  error: errors.email ?? networkErrors.email,
                  validate: () => validateFields({ email: data.email }),
               }}
               prefix="empty-form"
            />
            <TextField
               label="Пароль"
               value={data.password}
               onChange={(password) => changeHandler({ password })}
               errorData={{
                  error: errors.password ?? networkErrors.password,
                  validate: () => validateFields({ password: data.password }),
               }}
               type="password"
               prefix="empty-form"
            />
         </div>

         <div className="empty-form__buttons-wrap">
            <CustomButton type="submit" disabled={hasError} className="empty-form__btn">
               Войти
            </CustomButton>
            <CustomButton onClick={goToRegistration} type="button" className="empty-form__btn">
               Регистрация
            </CustomButton>
         </div>
      </form>
   );
};
