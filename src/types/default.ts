export type Nullable<T> = null | T;
export type DeepPartial<T> = T extends object
   ? {
        [P in keyof T]?: DeepPartial<T[P]>;
     }
   : T;
export type PartialRecord<K extends keyof any, T> = {
   [P in K]?: T;
};
