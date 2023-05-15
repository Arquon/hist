import React, { type FC } from "react";
import { type ICommonProps } from "@/types/ICommonProps";
import { createPortal } from "react-dom";

interface ModalPortalProps extends ICommonProps {}

export const ModalPortal: FC<ModalPortalProps> = ({ children }) => {
   return <>{createPortal(children, document.body)}</>;
};
