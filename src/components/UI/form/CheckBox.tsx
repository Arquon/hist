import React from "react";
import { getClassName } from "@/utils/functions";
import { type CustomComponentProps } from "@/types/common";

interface CheckBoxOwnProps {
   onClick: () => void;
   label: string;
   id: string;
   checked: boolean;
   error?: string;
}

type CheckBoxProps = CustomComponentProps<"input", CheckBoxOwnProps>;

export const CheckBox = ({ className, label, id, error, onClick, checked, ...restProps }: CheckBoxProps) => {
   const computedClassName = getClassName({ initialClassName: "checkbox", className });

   return (
      <div className={computedClassName}>
         <input id={id} type="checkbox" onClick={onClick} hidden checked={checked} {...restProps} />
         <label htmlFor={id}>{label}</label>
         {error && <p>error</p>}
      </div>
   );
};
