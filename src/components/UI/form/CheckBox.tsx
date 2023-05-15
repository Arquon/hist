import React, { type FC } from "react";
import { type ICommonProps } from "@/types/ICommonProps";
import { getClassName } from "@/utils/functions";

interface CheckBoxProps extends ICommonProps {
   onClick: () => void;
   label: string;
   id: string;
   error?: string;
}

export const CheckBox: FC<CheckBoxProps> = ({ className, label, id, error, onClick }) => {
   const computedClassName = getClassName({ initialClassName: "checkbox", className });

   return (
      <div className={computedClassName}>
         <input id={id} type="checkbox" onClick={onClick} hidden />
         <label htmlFor={id}>{label}</label>
         {error && <p>error</p>}
      </div>
   );
};
