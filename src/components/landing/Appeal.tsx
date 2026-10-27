import React from "react";

import { ButtonLink } from "../UI/CustomLink";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { type CommonProps } from "@/types/common";

export const Appeal = ({ className: propsClassname }: CommonProps) => {
   const { isMobile } = useMatchMedia();

   const className = ["appeal"];
   if (propsClassname !== undefined) className.push(propsClassname);

   return (
      <div className={className.join(" ")}>
         <h3 className="appeal__heading">
            Обращение <br />
            досточтимого Мастера
         </h3>
         <p className="appeal__text">
            Любезные Братья, уважаемые друзья! <br /> The purpose of&nbsp;Freemasonry, an&nbsp;essentially
            philanthropic, philosophical and progressive institution, is&nbsp;to&nbsp;seek the truth, study morality and
            practice solidarity [...] The principles of&nbsp;Freemasonry are mutual tolerance, respect for others and
            for self, and total liberty of&nbsp;conscience. It&nbsp;holds that metaphysical concepts are exclusively
            personal, and therefore rejects all dogmatic affirmations. It&nbsp;is&nbsp;committed to&nbsp;the fundamental
            importance of&nbsp;the secularism. [...]&quot; The purpose of&nbsp;Freemasonry, an&nbsp;essentially
            philanthropic, philosophical and progressive institution, is&nbsp;to&nbsp;seek the truth, study morality and
            practice solidarity [...] The principles of&nbsp;Freemasonry are mutual tolerance, respect for others and
            for self, and total liberty of&nbsp;conscience. It&nbsp;holds that metaphysical concepts are exclusively
            personal, and therefore rejects all dogmatic affirmations. It&nbsp;is&nbsp;committed to&nbsp;the fundamental
            importance of&nbsp;the secularism. [...]&quot;
         </p>
         {isMobile && <ButtonLink to="/freemasonry">Подробнее</ButtonLink>}
         <p className="appeal__text">С уважением, Брат А.Б.</p>
      </div>
   );
};
