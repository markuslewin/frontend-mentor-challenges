export function rem(px: number) {
	return `${px / 16}rem`
}

export function percentage(fraction: number) {
	return `${fraction * 100}%`
}

export const hocus = '&:hover, &:focus-visible'
