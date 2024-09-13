import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import { screens } from './app/utils/screens'
import { center } from './tailwind/center'
import { clamp } from './tailwind/clamp'
import { clickable } from './tailwind/clickable'
import { hocus } from './tailwind/hocus'
import { layer } from './tailwind/layer'
// import { rem } from "./tailwind/rem";
import { shape } from './tailwind/shape'
import { theGrid } from './tailwind/the-grid'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
		screens,
		colors: {
			transparent: colors.transparent,
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
			'heading-l': [clamp(32, 48), { fontWeight: 500, lineHeight: 1 }],
			'heading-m': [clamp(24, 39), { fontWeight: 500, lineHeight: 1 }],
			body: [clamp(16, 20), { lineHeight: 1.2 }],
		},
		borderRadius: {
			inherit: 'inherit',
			xl: defaultTheme.borderRadius.xl,
			full: defaultTheme.borderRadius.full,
		},
		extend: {
			aria: {
				invalid: 'invalid="true"',
			},
		},
	},
	plugins: [center, clickable, hocus, layer, shape, theGrid],
}
