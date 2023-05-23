import { classesFromArray } from "@/utils/functions";
import React, { useState, type FC } from "react";

interface DropDownItemProps {
   question: string;
   answer: string;
}

export const DropDownItem: FC<DropDownItemProps> = ({ question, answer }) => {
   const [isOpenAnswer, setIsOpenAnswer] = useState(false);

   const toggleAnswerHandler = (): void => setIsOpenAnswer((prevShow) => !prevShow);

   const dropDownClasses = ["drop-down-item"];
   if (isOpenAnswer) dropDownClasses.push("drop-down-item_open");

   return (
      <div className={classesFromArray(dropDownClasses)}>
         <p className="drop-down-item__question" onClick={toggleAnswerHandler}>
            {question}
         </p>
         {isOpenAnswer && <p className="drop-down-item__answer">{answer}</p>}
      </div>
   );
};
