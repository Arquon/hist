export interface ICommonProps {
   children?: React.ReactNode;
   className?: string;
}

export interface ICustomLinkProps extends ICommonProps {
   to: string;
   onClick?: () => void;
}
