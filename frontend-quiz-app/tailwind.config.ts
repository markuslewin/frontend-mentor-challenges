import { type Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'
import radixPlugin from 'tailwindcss-radix'
import { marketingPreset } from './app/routes/_marketing+/tailwind-preset'
import { extendedTheme } from './app/utils/extended-theme.ts'

function rem(px: number) {
	return `${px / 16}rem`
}

export default {
	content: ['./app/**/*.{ts,tsx,jsx,js}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		colors: {
			purple: 'hsl(277 91% 56%)',
			'dark-navy': 'hsl(216 25% 25%)',
			navy: 'hsl(215 27% 32%)',
			'grey-navy': 'hsl(219 13% 44%)',
			'light-bluish': 'hsl(216 47% 78%)',
			'light-grey': 'hsl(220 38% 97%)',
			'pure-white': 'hsl(0 0% 100%)',
			green: 'hsl(151 70% 50%)',
			red: 'hsl(0 82% 63%)',
		},
		fontFamily: {
			body: '"Rubik Variable", sans-serif',
		},
		fontSize: {
			display: rem(144),
			'heading-l': rem(64),
			'heading-m': rem(36),
			'heading-s': rem(28),
			'body-m': rem(24),
			'body-s': rem(20),
		},
		extend: {
			...extendedTheme,
		},
	},
	presets: [marketingPreset],
	plugins: [animatePlugin, radixPlugin],
} satisfies Config
