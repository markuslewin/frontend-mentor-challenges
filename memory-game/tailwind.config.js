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
			FDA214: 'hsl(37 98% 54%)',
			BCCED9: 'hsl(203 28% 79%)',
			304859: 'hsl(205 30% 27%)',
			152938: 'hsl(206 45% 15%)',
			F2F2F2: 'hsl(0 0% 95%)',
			'7191A5': 'hsl(203 22% 55%)',
			'6395B8': 'hsl(205 37% 55%)',
			FCFCFC: 'hsl(0 0% 99%)',
		},
		fontFamily: {
			base: "'Atkinson Hyperlegible', sans-serif",
		},
		fontSize: {
			'new-title': [clamp(32, 40)],
			'new-label': [clamp(15, 20)],
			'new-value': [clamp(16, 26)],
			'new-start': [clamp(18, 32)],
			'game-title': [clamp(24, 40)],
			'game-option': [clamp(16, 20)],
			'game-tile-4x4': [clamp(40, 56)],
			'game-tile-6x6': [clamp(24, 44)],
			'game-meta-label': [
				clamp(15, 18, {
					minWidth: 768,
					maxWidth: 1110,
				}),
			],
			'game-meta-value': [
				clamp(24, 32, {
					minWidth: 768,
					maxWidth: 1110,
				}),
			],
			'game-meta-current': [
				clamp(13, 13),
				{
					letterSpacing: `${5 / 13}em`,
				},
			],
			'dialog-title': [clamp(24, 48)],
			'dialog-body': [clamp(14, 18)],
			'dialog-label': [clamp(13, 18)],
			'dialog-value': [clamp(20, 32)],
			'dialog-button': [clamp(18, 20)],
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
