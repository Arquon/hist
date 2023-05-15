import React, { type FC } from "react";
import { type ICommonProps } from "@/types/ICommonProps";
import { classesFromArray } from "@/utils/functions";

interface SampleButtonProps extends ICommonProps {
   type?: "button" | "submit";
   onClick?: () => void | Promise<void>;
   disabled?: boolean;
}

interface SubmitButton extends SampleButtonProps {
   type: "submit";
}

interface SampleButton extends SampleButtonProps {
   type?: "button";
   onClick: () => void | Promise<void>;
}

type ButtonProps = SubmitButton | SampleButton;

export const CustomButton: FC<ButtonProps> = ({ children, className, type = "button", disabled, onClick }) => {
   const classes = ["btn"];

   if (className !== undefined) classes.push(className);

   return (
      <button className={classesFromArray(classes)} type={type} onClick={onClick} disabled={disabled}>
         {children}
      </button>
   );
};
