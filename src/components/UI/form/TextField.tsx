import React, { type FC } from "react";

interface TextFieldProps {
   label: string;
   value: string;
   onChange: (str: string) => void;
   error?: string;
   type?: "text" | "password";
   autoComplete?: string;
}

export const TextField: FC<TextFieldProps> = ({
   label,
   value,
   onChange,
   error,
   type = "text",
   autoComplete = "off",
}) => {
   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { target } = e;
      onChange(target.value);
   };

   return (
      <div>
         <label>
            <p>{label}</p>
            <input value={value} onChange={changeHandler} type={type} autoComplete={autoComplete} />
            {error && <p>{error}</p>}
         </label>
      </div>
   );
};
