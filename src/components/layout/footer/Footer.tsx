import React, { type FC } from "react";

import logo from "@/assets/images/logo.png";
import coin from "@/assets/images/coin.png";
import { Container } from "@/components/UI/Common";
import { CustomLink } from "@/components/UI/CustomLink";
import { type ICustomLinkProps } from "@/types/ICommonProps";

const FooterLogo: FC = () => (
   <div className="footer__logo">
      <img src={logo} alt="" />
   </div>
);

const FooterCoin: FC = () => (
   <div className="footer__coin">
      <img src={coin} alt="" />
   </div>
);

const FooterNav: FC = () => (
   <div className="footer__nav">
      <ul className="footer__list list-footer">
         <FooterLink to="/news">Новости</FooterLink>
         <FooterLink to="/freemasonry">Масонство</FooterLink>
         <FooterLink to="/france">Великий Восток Франции</FooterLink>
         <FooterLink to="/moscow">Ложа Москва</FooterLink>
         <FooterLink to="/faq">Частые вопросы</FooterLink>
         <FooterLink to="/introduce">Вступление</FooterLink>
         <FooterLink to="/contacts">Контакты</FooterLink>
      </ul>
      <p className="footer__credentials" />
   </div>
);

export const FooterLink: FC<ICustomLinkProps> = ({ children, className, to }) => {
   const classes = ["list-footer__link"];
   if (className !== undefined && className !== "") classes.push(className);

   return (
      <li>
         <CustomLink to={to} className={classes.join(" ")}>
            {children}
         </CustomLink>
      </li>
   );
};

const Footer: React.FC = ({}) => {
   return (
      <footer>
         <Container className="footer__container">
            <div className="footer__content">
               <FooterLogo />
               <FooterNav />
               <FooterCoin />
            </div>
         </Container>
      </footer>
   );
};

export default Footer;
