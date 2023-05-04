import React, { type FC } from "react";
import { type ICommonProps } from "@/types/ICommonProps";
import { classesFromArray } from "@/functions/utils";

interface ButtonProps extends ICommonProps {
   onClick: () => void | Promise<void>;
}

export const CustomButton: FC<ButtonProps> = ({ onClick, children, className }) => {
   const classes = ["btn"];

   if (className !== undefined) classes.push(className);

   return (
      <button className={classesFromArray(classes)} type="button" onClick={onClick}>
         {children}
      </button>
   );
};
