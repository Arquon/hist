import React, { useState } from "react";

import { Container } from "@/components/UI/Common";
import { HeaderLogo, HeaderNav, HeaderMenu, HeaderCoin } from "./app/app";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { useMatchMedia } from "@/hooks/useMatchMedia";

const Header: React.FC = ({}) => {
   const { isMobile } = useMatchMedia();
   const { isAuth, signOut } = useAuth();
   const navigate = useNavigate();
   const [isActive, setIsActive] = useState(false);

   const handleSignOut = (): void => {
      signOut();
      navigate("/");
   };

   const toggleActive = (): void => setIsActive((prev) => !prev);
   const closeMenu = (): void => setIsActive(false);

   return (
      <header>
         <Container className="header__container">
            <div className="header__content">
               <HeaderLogo />
               <HeaderNav isActive={isActive} closeMenu={closeMenu} />
               {isMobile && <HeaderMenu isActive={isActive} toggleActive={toggleActive} />}
               <div className="header__last">
                  {isAuth ? (
                     <a onClick={handleSignOut} role="button" className="header__logout">
                        Выйти
                     </a>
                  ) : (
                     <HeaderCoin />
                  )}
               </div>
            </div>
         </Container>
      </header>
   );
};

export default Header;
