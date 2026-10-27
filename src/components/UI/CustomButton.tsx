import React from "react";
import { classesFromArray } from "@/utils/functions";
import { type CommonProps } from "@/types/common";

interface SampleButtonProps extends CommonProps {
   type?: "button" | "submit";
   onClick?: () => void | Promise<void>;
   disabled?: boolean;
}

interface SubmitButton extends SampleButtonProps {
   type: "submit";
   onClick?: never;
}

interface SampleButton extends SampleButtonProps {
   type?: "button";
   onClick: () => void | Promise<void>;
}

type ButtonProps = SubmitButton | SampleButton;

export const CustomButton = ({ children, className, type = "button", disabled, onClick }: ButtonProps) => {
   const classes = ["btn"];

   if (className !== undefined) classes.push(className);

   return (
      <button className={classesFromArray(classes)} type={type} onClick={onClick} disabled={disabled}>
         {children}
      </button>
   );
};
