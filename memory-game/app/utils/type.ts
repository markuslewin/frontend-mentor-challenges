export type Writeable<T> = { -readonly [K in keyof T]: T[K] }

export type Value<T> = T extends Record<any, infer U> ? U : never
