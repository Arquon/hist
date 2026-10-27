import { type CommonProps } from "@/types/common";
import React from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps extends CommonProps {}

export const ModalPortal = ({ children }: ModalPortalProps) => {
   return <>{createPortal(children, document.body)}</>;
};
