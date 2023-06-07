import React, { type FC } from "react";
import { useMatch, Link } from "react-router-dom";

import { CustomLink } from "@/components/UI/CustomLink";
import { type ICustomLinkProps } from "@/types/ICommonProps";

import logo from "@/assets/images/logo.png";
import coin from "@/assets/images/coin.png";

interface IHeaderLinkProps extends ICustomLinkProps {
   closeMenu: () => void;
}
export const HeaderLink: FC<IHeaderLinkProps> = ({ children, className, to, closeMenu }) => {
   const match = useMatch({ path: to });

   const classes = ["list-header__link"];
   if (className !== undefined && className !== "") classes.push(className);
   if (match !== null) classes.push("list-header__link_active");

   return (
      <li>
         <CustomLink to={to} className={classes.join(" ")} onClick={closeMenu}>
            {children}
         </CustomLink>
      </li>
   );
};

export const HeaderLogo: FC = () => (
   <Link className="header__logo" to="/">
      <img src={logo} alt="" />
      Главная
   </Link>
);

interface IHeaderNavProps {
   isActive: boolean;
   closeMenu: () => void;
}

export const HeaderNav: FC<IHeaderNavProps> = ({ isActive, closeMenu }) => {
   const classes = ["header__nav"];

   if (isActive) classes.push("header__nav_active");

   return (
      <nav className={classes.join(" ")}>
         <ul className="header__list list-header">
            <HeaderLink closeMenu={closeMenu} to="/news">
               Новости
            </HeaderLink>
            <HeaderLink closeMenu={closeMenu} to="/freemasonry">
               Масонство
            </HeaderLink>
            <HeaderLink closeMenu={closeMenu} to="/france">
               Великий Восток Франции
            </HeaderLink>
            <HeaderLink closeMenu={closeMenu} to="/moscow">
               Ложа Москва
            </HeaderLink>
            <HeaderLink closeMenu={closeMenu} to="/faq">
               Частые вопросы
            </HeaderLink>
            <HeaderLink closeMenu={closeMenu} to="/introduce">
               Вступление
            </HeaderLink>
            <HeaderLink closeMenu={closeMenu} to="/contacts">
               Контакты
            </HeaderLink>
         </ul>
      </nav>
   );
};

interface IHeaderMenuProps {
   isActive: boolean;
   toggleActive: () => void;
}

export const HeaderMenu: FC<IHeaderMenuProps> = ({ isActive, toggleActive }) => {
   const classes = ["header__menu"];
   if (isActive) classes.push("header__menu_active");

   return (
      <div className={classes.join(" ")} onClick={toggleActive}>
         <span></span>
         <span></span>
         <span></span>
      </div>
   );
};

export const HeaderCoin: FC = () => (
   <div className="header__wrap">
      <Link className="header__coin" to="/login">
         <img src={coin} alt="" />
         Выйти
      </Link>
   </div>
);
