import React from "react";
import { getClassName } from "@/utils/functions";
import { type CommonProps } from "@/types/common";

interface CheckBoxProps extends CommonProps {
   onClick: () => void;
   label: string;
   id: string;
   error?: string;
}

export const CheckBox = ({ className, label, id, error, onClick }: CheckBoxProps) => {
   const computedClassName = getClassName({ initialClassName: "checkbox", className });

   return (
      <div className={computedClassName}>
         <input id={id} type="checkbox" onClick={onClick} hidden />
         <label htmlFor={id}>{label}</label>
         {error && <p>error</p>}
      </div>
   );
};
