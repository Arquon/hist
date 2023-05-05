import React, { type FC } from "react";
import { CircleLoader } from "react-spinners";

interface LoaderProps {}

export const Loader: FC<LoaderProps> = ({}) => {
   return (
      <div className="loader">
         <CircleLoader color="#efd270" size={120} />
      </div>
   );
};
