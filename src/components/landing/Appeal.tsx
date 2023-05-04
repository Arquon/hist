import React, { type FC } from "react";

import { type ICommonProps } from "@/types/ICommonProps";
import { useCurrentWidth } from "@/context/currentWidthContext";
import { ButtonLink } from "../UI/CustomLink";

export const Appeal: FC<ICommonProps> = ({ className }) => {
   const { currentWidth } = useCurrentWidth();

   const classes = ["appeal"];
   if (className !== undefined) classes.push(className);

   return (
      <div className={classes.join(" ")}>
         <h3 className="appeal__heading">
            Обращение <br />
            досточтимого Мастера
         </h3>
         <p className="appeal__text">
            Любезные Братья, уважаемые друзья! <br /> The purpose of&nbsp;Freemasonry, an&nbsp;essentially philanthropic, philosophical and progressive institution, is&nbsp;to&nbsp;seek the truth,
            study morality and practice solidarity [...] The principles of&nbsp;Freemasonry are mutual tolerance, respect for others and for self, and total liberty of&nbsp;conscience. It&nbsp;holds
            that metaphysical concepts are exclusively personal, and therefore rejects all dogmatic affirmations. It&nbsp;is&nbsp;committed to&nbsp;the fundamental importance of&nbsp;the secularism.
            [...]&quot; The purpose of&nbsp;Freemasonry, an&nbsp;essentially philanthropic, philosophical and progressive institution, is&nbsp;to&nbsp;seek the truth, study morality and practice
            solidarity [...] The principles of&nbsp;Freemasonry are mutual tolerance, respect for others and for self, and total liberty of&nbsp;conscience. It&nbsp;holds that metaphysical concepts
            are exclusively personal, and therefore rejects all dogmatic affirmations. It&nbsp;is&nbsp;committed to&nbsp;the fundamental importance of&nbsp;the secularism. [...]&quot;
         </p>
         {currentWidth < 1024 && <ButtonLink to="/freemasonry">Побробнее</ButtonLink>}
         <p className="appeal__text">С уважением, Брат А.Б.</p>
      </div>
   );
};
