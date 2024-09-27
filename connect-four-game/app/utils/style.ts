import { type StyleRule } from '@vanilla-extract/css'
import { key as routeKey, type Route } from '#app/utils/body-route'

export function rem(px: number) {
	return `${px / 16}rem`
}

export function dataRoute(route: Route) {
	return `data-${routeKey}="${route}"`
}

// https://tailwindcss.com/docs/transition-property
export const transitionBase = {
	transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	transitionDuration: '150ms',
} satisfies StyleRule

export const transitionPropsByGroup = {
	shadow: ['box-shadow'],
	color: [
		'color',
		'background-color',
		'border-color',
		'text-decoration-color',
		'fill',
		'stroke',
	],
}

// Colors
export const baseColors = {
	black: '0 0% 0%',
}

export const colors = {
	black: `hsl(${baseColors.black})`,
	'dark-purple': 'hsl(257 67% 51%)',
	purple: 'hsl(257 100% 64%)',
	red: 'hsl(347 97% 70%)',
	yellow: 'hsl(41 100% 70%)',
	white: 'hsl(0 0% 100%)',
}

// Text styles
export const headingL = {
	fontSize: rem(56),
	fontWeight: 700,
	lineHeight: rem(71),
} satisfies StyleRule

export const headingM = {
	fontSize: rem(24),
	fontWeight: 700,
	lineHeight: rem(31),
} satisfies StyleRule

export const headingS = {
	fontSize: rem(20),
	fontWeight: 700,
	lineHeight: rem(26),
} satisfies StyleRule

export const headingXs = {
	fontSize: rem(16),
	fontWeight: 700,
	lineHeight: rem(21),
} satisfies StyleRule

export const body = {
	fontSize: rem(16),
	fontWeight: 500,
	lineHeight: rem(21),
} satisfies StyleRule
