import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import { screens } from './app/utils/screens'
import { center } from './tailwind/center'
// import { clamp } from './tailwind/clamp'
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
		backgroundImage: {
			'gradient-to-b': defaultTheme.backgroundImage['gradient-to-b'],
			'pink-gradient':
				'linear-gradient(to bottom, hsl(300 99% 72%) 1.5rem, hsl(223 100% 72%))',
			'pink-gradient-tablet':
				'linear-gradient(to bottom, hsl(300 99% 72%) 2rem, hsl(223 100% 72%))',
			'blue-gradient':
				'linear-gradient(to bottom, hsl(209 100% 70%), hsl(0 0% 100%))',
		},
		colors: {
			transparent: colors.transparent,
			blue: 'hsl(223, 100%, 57%)',
			white: 'hsl(0, 0%, 100%)',
			'dark-navy': 'hsl(250, 68%, 27%)',
		},
		fontFamily: {
			base: "'Mouse Memoirs', sans-serif",
		},
		fontSize: {
			136: rem(136),
			134: rem(134),
			104: rem(104),
			94: rem(94),
			88: rem(88),
			64: rem(64),
			48: rem(48),
			40: rem(40),
			32: rem(32),
			26: rem(26),
			24: rem(24),
			20: rem(20),
			16: rem(16),
		},
		lineHeight: {
			120: '1.2',
			150: '1.5',
		},
		letterSpacing: {
			0: '0em',
			'05': '0.005em',
			2: '0.02em',
			5: '0.05em',
		},
		borderRadius: {
			full: defaultTheme.borderRadius.full,
			inherit: 'inherit',
		},
		extend: {
			aria: {
				invalid: 'invalid="true"',
			},
		},
	},
	plugins: [center, clickable, hocus, layer, shape, theGrid],
}
