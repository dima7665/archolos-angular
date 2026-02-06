type NonUndefined<T> = T extends undefined ? never : T;

type Nullable<T> = T | null | undefined;
