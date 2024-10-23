export function formatTime(ms: number) {
	const s = ms / 1000
	return `${Math.floor(s / 60)}:${Math.floor(s % 60)
		.toString()
		.padStart(2, '0')}`
}
