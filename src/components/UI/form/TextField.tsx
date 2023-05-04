import React, { type FC } from "react";

interface TextFieldProps {
   label: string;
   value: string;
   onChange: (str: string) => void;
   error?: string;
   type?: React.HTMLInputTypeAttribute;
}

export const TextField: FC<TextFieldProps> = ({ label, value, onChange, error, type = "text" }) => {
   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { target } = e;
      onChange(target.value);
   };

   return (
      <label>
         <p>{label}</p>
         <input value={value} onChange={changeHandler} type={type} />
         {error && <p>{error}</p>}
      </label>
   );
};
