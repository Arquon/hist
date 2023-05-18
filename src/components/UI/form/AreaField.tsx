import { classesFromArray, getClassName } from "@/utils/functions";
import React, { type FC } from "react";

interface AreaFieldProps {
   label: string;
   value: string;
   onChange: (str: string) => void;
   error?: string;
   prefix?: string;
}

export const AreaField: FC<AreaFieldProps> = ({ label, value, onChange, error, prefix }) => {
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
         <textarea value={value} onChange={changeHandler} className={computedAreaClassName}></textarea>
         {error && <p className={computedErrorClassName}>{error}</p>}
      </div>
   );
};
