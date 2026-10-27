import { getClassName } from "@/utils/functions";
import React from "react";
import { CircleLoader } from "react-spinners";

interface LoaderProps {
   size?: number;
   className?: string;
}

export const Loader = ({ size = 120, className }: LoaderProps) => {
   const computedClassName = getClassName({ initialClassName: "loader", className });

   return (
      <div className={computedClassName}>
         <CircleLoader color="#efd270" size={size} />
      </div>
   );
};
