import { colors } from './app/utils/colors'
import { fontFamily } from './app/utils/fonts'
import { screens } from './app/utils/screens'
import { center } from './tailwind/center'
import { clamp } from './tailwind/clamp'
import { clickable } from './tailwind/clickable'
import { hocus } from './tailwind/hocus'
import { rem } from './tailwind/rem'
import { shape } from './tailwind/shape'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
		screens,
		colors,
		fontFamily,
		fontSize: {
			h1: [
				clamp(80, 100),
				{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.05em' },
			],
			h2: [clamp(20, 28), { fontWeight: 700, lineHeight: 1.2 }],
			h3: [
				clamp(14, 16),
				{ fontWeight: 700, lineHeight: 1.1875, letterSpacing: '0.9375em' },
			],
			h4: [
				clamp(11, 13),
				{ fontWeight: 700, lineHeight: 1.1875, letterSpacing: '0.3846em' },
			],
			'body-1': [clamp(12, 14), { fontWeight: 700, lineHeight: 1.2857 }],
			'body-2': [clamp(12, 12), { fontWeight: 700, lineHeight: 1.1667 }],
		},
		borderRadius: {
			xs: rem(10),
			sm: rem(15),
			DEFAULT: rem(25),
			full: '9999px',
		},
		extend: {
			aria: {
				invalid: 'invalid="true"',
			},
		},
	},
	plugins: [hocus, shape, clickable, center],
}
