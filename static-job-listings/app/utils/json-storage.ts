export function getItem(key: string) {
	const item = sessionStorage.getItem(key)
	if (item === null) return null

	return JSON.parse(item) as unknown
}

export function setItem(key: string, value: unknown) {
	sessionStorage.setItem(key, JSON.stringify(value))
}
