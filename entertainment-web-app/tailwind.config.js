import { screens } from './app/utils/screens'
import { center } from './tailwind/center'
import { clamp } from './tailwind/clamp'
import { clickable } from './tailwind/clickable'
import { hocus } from './tailwind/hocus'
import { layer } from './tailwind/layer'
import { rem } from './tailwind/rem'
import { shape } from './tailwind/shape'
import { theGrid } from './tailwind/the-grid'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
		screens,
		colors: {
			red: 'hsl(0 97% 63%)',
			'dark-blue': 'hsl(223 30% 9%)',
			'greyish-blue': 'hsl(223 23% 46%)',
			'semi-dark-blue': 'hsl(223 36% 14%)',
			'pure-white': 'hsl(0 0% 100%)',
			transparent: 'transparent',
		},
		fontFamily: {
			base: "'Outfit Variable', sans-serif",
		},
		fontSize: {
			'heading-l': [
				clamp(20, 32),
				{ fontWeight: 300, letterSpacing: '-0.015625em' },
			],
			'heading-m': [clamp(16, 24), { fontWeight: 300 }],
			'heading-s': [clamp(15, 24), { fontWeight: 500 }],
			'heading-xs': [clamp(14, 18), { fontWeight: 500 }],
			'body-m': [clamp(12, 15), { fontWeight: 300 }],
			'body-s': [clamp(11, 13), { fontWeight: 300 }],
		},
		borderRadius: {
			sm: rem(8),
			DEFAULT: rem(10),
			lg: rem(20),
			full: '9999px',
		},
		extend: {
			aria: {
				invalid: 'invalid="true"',
			},
		},
	},
	plugins: [hocus, layer, shape, clickable, center, theGrid],
}
