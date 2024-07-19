import { invariant } from '@epic-web/invariant'
import { calculateClamps } from 'utopia-core'
import { screens } from './app/utils/screens'
import { center } from './tailwind/center'
import { clickable } from './tailwind/clickable'
import { hocus } from './tailwind/hocus'
// import { rem } from "./tailwind/rem";
import { shape } from './tailwind/shape'

const clamps = calculateClamps({
	minWidth: 375,
	maxWidth: 1110,
	// todo: Add type scale
	pairs: [
		[32, 48],
		[24, 39],
		[16, 20],
	],
})

function getClamp(step) {
	const info = clamps[step]
	invariant(info !== undefined, `Couldn't find clamp at step ${step}`)

	return info.clamp
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
		screens,
		colors: {
			// todo: Add colors
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			overlay: 'hsl(var(--overlay))',
			menu: {
				DEFAULT: 'hsl(var(--menu))',
				foreground: 'hsl(var(--menu-foreground))',
			},
			button: {
				DEFAULT: 'hsl(var(--button))',
				foreground: 'hsl(var(--button-foreground))',
				hocus: 'hsl(var(--button-hocus))',
			},
			input: {
				DEFAULT: 'hsl(var(--input))',
				'border-hocus': 'hsl(var(--input-border-hocus))',
			},
			pill: {
				DEFAULT: 'hsl(var(--pill))',
				foreground: 'hsl(var(--pill-foreground))',
			},
			delete: {
				foreground: 'hsl(var(--delete-foreground))',
				'foreground-hocus': 'hsl(var(--delete-foreground-hocus))',
			},
			error: {
				foreground: 'hsl(var(--error-foreground))',
			},
		},
		fontFamily: {
			// todo: Add font from Fontsource
			base: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
		},
		fontSize: {
			// todo: Add font sizes
			'heading-l': [getClamp(0), { fontWeight: 500, lineHeight: 1 }],
			'heading-m': [getClamp(1), { fontWeight: 500, lineHeight: 1 }],
			body: [getClamp(2), { lineHeight: 1.2 }],
		},
		extend: {},
	},
	plugins: [hocus, shape, clickable, center],
}
