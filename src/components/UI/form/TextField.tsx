import { type CustomComponentProps } from "@/types/common";
import { classesFromArray, getClassName } from "@/utils/functions";

import React, { useRef } from "react";

interface TextFieldOwnProps {
   label: string;
   value: string;
   onChange: (str: string) => void;
   type: "text" | "password" | "email";
   autoComplete?: string;
   prefix?: string;
   errorData?: {
      validate?: () => void;
      error?: string | false;
   };
}

type TextFieldProps = CustomComponentProps<"input", TextFieldOwnProps>;

export const TextField = ({
   label,
   value,
   onChange,
   errorData,
   type = "text",
   autoComplete = "off",
   prefix,
   ...restProps
}: TextFieldProps) => {
   const error = errorData?.error;
   const validate = errorData?.validate;

   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { target } = e;
      onChange(target.value);
   };

   const input = useRef<HTMLInputElement>(null);

   const labelClickHandler = (): void => {
      if (!input.current) return;
      input.current.focus();
   };

   let inputClasses: string[] = [];
   let labelClasses: string[] = [];
   let groupClasses: string[] = [];
   let errorClasses: string[] = [];

   if (prefix) {
      inputClasses = [`${prefix}__input`];
      labelClasses = [`${prefix}__label`];
      groupClasses = [`${prefix}__input-group`];
      errorClasses = [`${prefix}__error`];
   }

   if (error) {
      inputClasses.push("input-group__input_error");
      labelClasses.push("input-group__label_error");
   }

   const computedLabelClassName = getClassName({
      initialClassName: "input-group__label",
      className: classesFromArray(labelClasses),
   });

   const computedInputClassName = getClassName({
      initialClassName: "input-group__input",
      className: classesFromArray(inputClasses),
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
         <label onClick={labelClickHandler} className={computedLabelClassName}>
            {label}
         </label>
         <input
            value={value}
            onChange={changeHandler}
            type={type}
            autoComplete={autoComplete}
            ref={input}
            className={computedInputClassName}
            onBlur={validate}
            {...restProps}
         />
         {error && <p className={computedErrorClassName}>{error}</p>}
      </div>
   );
};
