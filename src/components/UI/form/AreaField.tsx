import { classesFromArray, getClassName } from "@/utils/functions";
import React from "react";

interface AreaFieldProps {
   label: string;
   value: string;
   onChange: (str: string) => void;
   prefix?: string;
   errorData?: {
      validate?: () => void;
      error?: string | false;
   };
}

export const AreaField = ({ label, value, onChange, errorData, prefix }: AreaFieldProps) => {
   const error = errorData?.error;
   const validate = errorData?.validate;

   const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { target } = e;
      onChange(target.value);
   };

   let areaClasses: string[] = [];
   let labelClasses: string[] = [];
   let groupClasses: string[] = [];
   let errorClasses: string[] = [];

   if (prefix) {
      areaClasses = [`${prefix}__area`];
      labelClasses = [`${prefix}__label`];
      groupClasses = [`${prefix}__input-group`];
      errorClasses = [`${prefix}__error`];
   }

   if (error) {
      areaClasses.push("input-group__area_error");
      labelClasses.push("input-group__label_error");
   }

   const computedLabelClassName = getClassName({
      initialClassName: "input-group__label",
      className: classesFromArray(labelClasses),
   });

   const computedAreaClassName = getClassName({
      initialClassName: "input-group__area",
      className: classesFromArray(areaClasses),
   });

   const computedGroupClassName = getClassName({
      initialClassName: "input-group",
      className: classesFromArray(groupClasses),
   });

   const computedErrorClassName = getClassName({
      initialClassName: "input-group__error",
      className: classesFromArray(errorClasses),
   });

   return (
      <div className={computedGroupClassName}>
         <label className={computedLabelClassName}>{label}</label>
         <textarea
            value={value}
            onChange={changeHandler}
            className={computedAreaClassName}
            onBlur={validate}
         ></textarea>
         {error && <p className={computedErrorClassName}>{error}</p>}
      </div>
   );
};
