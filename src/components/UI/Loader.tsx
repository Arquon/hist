import { getClassName } from "@/utils/functions";
import React, { type FC } from "react";
import { CircleLoader } from "react-spinners";

interface LoaderProps {
   size?: number;
   className?: string;
}

export const Loader: FC<LoaderProps> = ({ size = 120, className }) => {
   const computedClassName = getClassName({ initialClassName: "loader", className });

   console.log("Loader");

   return (
      <div className={computedClassName}>
         <CircleLoader color="#efd270" size={size} />
      </div>
   );
};
