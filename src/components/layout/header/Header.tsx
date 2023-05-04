import React, { useState } from "react";

import { Container } from "@/components/UI/Common";
import { HeaderLogo, HeaderNav, HeaderMenu, HeaderCoin } from "./app/app";

const Header: React.FC = ({}) => {
   const [isActive, setIsActive] = useState(false);

   const toggleActive = (): void => setIsActive((prev) => !prev);
   const closeMenu = (): void => setIsActive(false);

   return (
      <header>
         <Container className="header__container">
            <div className="header__content">
               <HeaderLogo />
               <HeaderNav isActive={isActive} closeMenu={closeMenu} />
               <HeaderMenu isActive={isActive} toggleActive={toggleActive} />
               <HeaderCoin />
            </div>
         </Container>
      </header>
   );
};

export default Header;
