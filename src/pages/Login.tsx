import React, { type FC, useState } from "react";
import { LoginForm } from "@/components/login/LoginForm";
import { RegistrationForm } from "@/components/login/RegistrationForm";
import { UnAuthRequired } from "@/hoc/withoutAuth";

interface LoginProps {}

export enum ELoginPage {
   login = "login",
   register = "register",
}

export const LoginPageComponent: FC<LoginProps> = ({}) => {
   const [loginPage, setLoginPage] = useState<ELoginPage>(ELoginPage.login);

   let Component: JSX.Element;

   switch (loginPage) {
      case ELoginPage.login:
         Component = <LoginForm setLoginPage={setLoginPage} />;
         break;
      case ELoginPage.register:
         Component = <RegistrationForm setLoginPage={setLoginPage} />;
         break;
   }

   return <div className="empty__form empty-form">{Component}</div>;
};

export const LoginPage: FC = () => (
   <UnAuthRequired>
      <LoginPageComponent />
   </UnAuthRequired>
);
