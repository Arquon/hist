import { getClassName } from "@/utils/functions";
import React, { type FC } from "react";

interface PaginationProps {
   allCount: number;
   perPageCount: number;
   currentPage: number;
   className?: string;
   onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ allCount, perPageCount, className, currentPage, onPageChange }) => {
   const length = Math.floor((allCount - 1) / perPageCount) + 1;
   const tempArray = Array(length).fill(0);

   const pageChangeHandler = (page: number): void => {
      onPageChange(page);
   };

   const computedClassName = getClassName({ initialClassName: "pagination", className });
   const getPaginationItemClassName = (index: number): string => {
      const classes = ["pagination__item"];
      if (index === currentPage) {
         classes.push("pagination__item_active");
      }
      return classes.join(" ");
   };

   return (
      <nav className={computedClassName}>
         <ul className="pagination__list">
            {tempArray.map((_, i) => (
               <li className={getPaginationItemClassName(i + 1)} onClick={() => pageChangeHandler(i + 1)} key={i}>
                  {i + 1}
               </li>
            ))}
         </ul>
      </nav>
   );
};
