import React, { useState } from "react";

import { Container } from "@/components/UI/Common";
import { HeaderLogo, HeaderNav, HeaderMenu, HeaderCoin } from "./app/app";
import { useAuth } from "@/context/authContext";
import { CustomButton } from "@/components/UI/CustomButton";
import { useNavigate } from "react-router-dom";

const Header: React.FC = ({}) => {
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
               <HeaderMenu isActive={isActive} toggleActive={toggleActive} />
               <div className="header__last">
                  {isAuth ? <CustomButton onClick={handleSignOut}>Выйти</CustomButton> : <HeaderCoin />}
               </div>
            </div>
         </Container>
      </header>
   );
};

export default Header;
