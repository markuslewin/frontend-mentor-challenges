import { globalStyle, style } from '@vanilla-extract/css'

const colors = {
	black: 'hsl(0 0% 0%)',
	'dark-purple': 'hsl(257 67% 51%)',
	purple: 'hsl(257 100% 64%)',
	red: 'hsl(347 97% 70%)',
	yellow: 'hsl(41 100% 70%)',
	white: 'hsl(0 0% 100%)',
}

globalStyle('body', {
	fontFamily: "'Space Grotesk Variable', sans-serif",
})

export const headingL = style({
	fontSize: rem(56),
	fontWeight: 700,
	lineHeight: rem(71),
})

export const headingM = style({
	fontSize: rem(24),
	fontWeight: 700,
	lineHeight: rem(31),
})

export const headingS = style({
	fontSize: rem(20),
	fontWeight: 700,
	lineHeight: rem(26),
})

export const headingXs = style({
	fontSize: rem(16),
	fontWeight: 700,
	lineHeight: rem(21),
})

export const body = style({
	fontSize: rem(16),
	fontWeight: 500,
	lineHeight: rem(21),
})

function rem(px: number) {
	return `${px / 16}rem`
}
