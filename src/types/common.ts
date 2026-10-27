export type Nullable<T> = null | T;
export type DeepPartial<T> = T extends object
   ? {
        [P in keyof T]?: DeepPartial<T[P]>;
     }
   : T;
export type PartialRecord<K extends keyof any, T> = {
   [P in K]?: T;
};
export type ObjectType = Record<PropertyKey, any>;
export interface ObjectTypeWithLength extends ObjectType {
   length: number;
}

export type ValidationErrors<T> = Record<keyof T, string | false>;

export interface CommonProps {
   children?: React.ReactNode;
   className?: string;
}

export interface CustomLinkProps extends CommonProps {
   to: string;
   onClick?: () => void;
}
