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
		screens: {
			tablet: '40em',
			desktop: '64em',
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
		boxShadow: {
			default: '0 1rem 2.5rem',
		},
		borderWidth: {
			3: '3px',
		},
		maxWidth: {
			default: rem(1160),
		},
		extend: extendedTheme,
	},
	presets: [marketingPreset],
	plugins: [animatePlugin, radixPlugin],
} satisfies Config
