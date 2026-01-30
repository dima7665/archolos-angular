export type ControlEventArgs<F> = F extends (...args: infer A) => any ? A : never;

export type ControlObject<O extends object, P extends keyof O = keyof O> = Pick<O, P>;
