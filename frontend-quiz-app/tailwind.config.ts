import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import animatePlugin from 'tailwindcss-animate'
import radixPlugin from 'tailwindcss-radix'
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
			1: '1px',
			3: '3px',
		},
		maxWidth: {
			default: rem(1160),
		},
		gridTemplateColumns: {
			'main-desktop': 'minmax(0, 29.0625rem) minmax(0, 35.25rem)',
		},
		backgroundImage: {
			'body-pattern-dark':
				"url('/assets/images/pattern-background-mobile-dark.svg')",
			'body-pattern-light':
				"url('/assets/images/pattern-background-mobile-light.svg')",
			'body-pattern-dark-tablet':
				"url('/assets/images/pattern-background-tablet-dark.svg')",
			'body-pattern-light-tablet':
				"url('/assets/images/pattern-background-tablet-light.svg')",
			'body-pattern-dark-desktop':
				"url('/assets/images/pattern-background-desktop-dark.svg')",
			'body-pattern-light-desktop':
				"url('/assets/images/pattern-background-desktop-light.svg')",
		},
		extend: extendedTheme,
	},
	plugins: [
		animatePlugin,
		radixPlugin,
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'shape-p': padding => {
						return {
							padding: `calc(${padding} - var(--shape-border-width, 0px))`,
							borderWidth: 'var(--shape-border-width)',
						}
					},
				},
				{ values: theme('size') },
			)
			matchUtilities(
				{
					'shape-py': padding => {
						return {
							'padding-top': `calc(${padding} - var(--shape-border-width, 0px))`,
							'padding-bottom': `calc(${padding} - var(--shape-border-width, 0px))`,
							borderWidth: 'var(--shape-border-width)',
						}
					},
				},
				{ values: theme('size') },
			)
			matchUtilities(
				{
					'shape-px': padding => {
						return {
							'padding-left': `calc(${padding} - var(--shape-border-width, 0px))`,
							'padding-right': `calc(${padding} - var(--shape-border-width, 0px))`,
							borderWidth: 'var(--shape-border-width)',
						}
					},
				},
				{ values: theme('size') },
			)
			matchUtilities(
				{
					'shape-border': borderWidth => {
						return {
							'--shape-border-width': borderWidth,
						}
					},
				},
				{ values: theme('borderWidth') },
			)
		}),
	],
} satisfies Config
