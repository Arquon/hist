import React, { type FC } from "react";

interface AreaFieldProps {
   label: string;
   value: string;
   error?: string;
   onChange: (str: string) => void;
}

export const AreaField: FC<AreaFieldProps> = ({ label, value, error, onChange }) => {
   const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { target } = e;
      onChange(target.value);
   };
   return (
      <label>
         <p>{label}</p>
         <textarea cols={30} rows={10} value={value} onChange={changeHandler}></textarea>
         {error && <p>{error}</p>}
      </label>
   );
};
