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
		colors: {
			// Primary
			cyan: 'hsl(180 66% 49%)',
			'dark-violet': 'hsl(257 27% 26%)',
			// Secondary
			red: 'hsl(0 87% 67%)',
			// Neutral
			gray: 'hsl(0 0% 75%)',
			'grayish-violet': 'hsl(257 7% 63%)',
			'very-dark-blue': 'hsl(255 11% 22%)',
			'very-dark-violet': 'hsl(260 8% 14%)',
			// Other
			white: 'hsl(0 0% 100%)',
			whiteish: 'hsl(225 33% 95%)',
			'light-cyan': 'hsl(180 56% 75%)',
		},
		fontFamily: {
			base: "'Poppins', sans-serif",
		},
		fontSize: {
			h1: [
				clamp(42, 80),
				{ fontWeight: 700, lineHeight: 1.125, letterSpacing: '-0.025em' },
			],
			h2: [
				clamp(28, 40),
				{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.025em' },
			],
			h3: [clamp(22, 22), { fontWeight: 700, lineHeight: 1.5 }],
			'body-1': [
				clamp(18, 22),
				{ fontWeight: 500, lineHeight: 1.636, letterSpacing: '0.0068em' },
			],
			'body-2': [
				clamp(16, 18),
				{ fontWeight: 500, lineHeight: 1.778, letterSpacing: '0.0067em' },
			],
			'body-3': [clamp(15, 15), { fontWeight: 500, lineHeight: 1.734 }],
			button: [clamp(20, 20), { fontWeight: 700, lineHeight: 1.5 }],
			input: [
				clamp(16, 20),
				{ fontWeight: 500, lineHeight: 1.8, letterSpacing: '0.0075em' },
			],
			error: [
				clamp(12, 16),
				{ fontWeight: 500, lineHeight: 1.125, letterSpacing: '0.0069em' },
			],
			'nav-1': [clamp(18, 18), { fontWeight: 700, lineHeight: 1.5 }],
			'nav-2': [
				clamp(16, 16),
				{ fontWeight: 700, lineHeight: 1.5, letterSpacing: '-0.016em' },
			],
			'nav-3': [clamp(15, 15), { fontWeight: 700, lineHeight: 1.53 }],
			'nav-4': [
				clamp(15, 15),
				{ fontWeight: 500, lineHeight: 1.53, letterSpacing: '-0.015em' },
			],
		},
		borderRadius: {
			sm: rem(5),
			DEFAULT: rem(10),
			full: '9999px',
		},
		extend: {},
	},
	plugins: [hocus, shape, clickable, center],
}
