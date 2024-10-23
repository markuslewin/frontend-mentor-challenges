export type Writeable<T> = { -readonly [K in keyof T]: T[K] }

export type Value<T> = T extends Record<any, infer U> ? U : never

export type Item<T> = T extends Readonly<Array<infer U>> ? U : never

export type AutocompleteEach<T extends (...args: any) => any> = [
	...Parameters<T>,
	ReturnType<T>,
]
