import { invariant } from '@epic-web/invariant'
import { calculateClamps } from 'utopia-core'
import { screens } from './app/utils/screens'
import { center } from './tailwind/center'
import { clickable } from './tailwind/clickable'
import { hocus } from './tailwind/hocus'
import { rem } from './tailwind/rem'
import { shape } from './tailwind/shape'

const clamps = calculateClamps({
	minWidth: 375,
	maxWidth: 1110,
	pairs: [
		[15, 22],
		[13, 18],
		[16, 18],
		[16, 16],
		[14, 14],
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
			white: 'hsl(0 0% 100%)',
			green: 'hsl(180 29% 50%)',
			'light-green': 'hsl(180 52% 96%)',
			grey: 'hsl(180 14% 20%)',
			'light-grey': 'hsl(180 8% 52%)',
			// 'light-grey': 'hsl(180 29% 50%)',
			'lighter-grey': 'hsl(180 10% 74%)',
		},
		fontFamily: {
			base: "'League Spartan Variable', sans-serif",
		},
		fontSize: {
			position: [getClamp(0), { fontWeight: 700, lineHeight: 1.1 }],
			company: [getClamp(1), { fontWeight: 700, lineHeight: 0.95 }],
			body: [
				getClamp(2),
				{ fontWeight: 500, lineHeight: 1.33, letterSpacing: '-0.00875em' },
			],
			tag: [
				getClamp(3),
				{ fontWeight: 700, lineHeight: 1.5, letterSpacing: '-0.0075em' },
			],
			meta: [
				getClamp(4),
				{ fontWeight: 700, lineHeight: 1, letterSpacing: '-0.006875em' },
			],
		},
		borderRadius: {
			DEFAULT: rem(5),
		},
		boxShadow: {
			DEFAULT: `0 ${rem(15)} ${rem(20)} ${rem(-5)} hsl(189 81% 28% / 15%)`,
		},
		extend: {},
	},
	plugins: [hocus, shape, clickable, center],
}
