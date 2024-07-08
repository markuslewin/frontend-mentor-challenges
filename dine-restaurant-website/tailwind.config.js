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
		[32, 80],
		[32, 48],
		[20, 20],
		[17, 17],
		[16, 20],
		[16, 16],
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
			// Primary
			beaver: 'hsl(27 22% 51%)',
			'cod-gray': 'hsl(0 0% 7%)',
			// Secondary
			mirage: 'hsl(234 30% 13%)',
			'ebony-clay': 'hsl(218 21% 18%)',
			'shuttle-gray': 'hsl(217 14% 42%)',
			// Other
			white: 'hsl(0 0% 100%)',
			red: 'hsl(0 43% 50%)',
		},
		fontFamily: {
			base: "'League Spartan Variable', sans-serif",
		},
		fontSize: {
			// todo: Add font sizes
			'heading-xl': [
				getClamp(0),
				{ fontWeight: 300, lineHeight: 1, letterSpacing: '-0.0125em' },
			],
			'heading-l': [
				getClamp(1),
				{ fontWeight: 700, lineHeight: 1, letterSpacing: '-0.0104em' },
			],
			'heading-m': [
				getClamp(2),
				{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.0125em' },
			],
			'heading-s': [
				getClamp(3),
				{ fontWeight: 600, lineHeight: 1.65, letterSpacing: '0.147em' },
			],
			'body-1': [getClamp(4), { lineHeight: 1.5 }],
			'body-2': [getClamp(5), { lineHeight: 1.625 }],
			// Other
			error: [
				rem(10),
				{ fontWeight: 500, lineHeight: 0.9, letterSpacing: '-0.013em' },
			],
		},
		extend: {},
	},
	plugins: [hocus, shape, clickable, center],
}
