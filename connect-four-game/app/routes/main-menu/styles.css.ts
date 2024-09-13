import { style, styleVariants } from '@vanilla-extract/css'
import { media } from '#app/utils/screens'
import { colors, headingM, transition, rem, hocus } from '#app/utils/style'

export const mainContainer = style({
	minHeight: '100vh',
	padding: rem(17),
	display: 'grid',
	gridTemplateColumns: `minmax(auto, ${rem(486)})`,
	placeContent: 'center',
})

export const menuContainer = style({
	'@media': {
		[media.tablet]: {
			border: `${rem(3)} solid ${colors.black}`,
			borderRadius: rem(40),
			paddingBlockStart: rem(67),
			paddingInline: rem(37),
			paddingBlockEnd: rem(57),
			boxShadow: `0 ${rem(10)} ${colors.black}`,
			background: colors.purple,
		},
	},
})

export const logo = style({
	marginInline: 'auto',
	width: rem(58),
	height: rem(61),
})

export const options = style({
	marginBlockStart: rem(70),
	display: 'grid',
	gap: rem(24),
})

export const option = style({
	display: 'grid',
})

const baseButton = style({
	...headingM,
	...transition('color', 'shadow'),
	...hocus({
		borderColor: colors['dark-purple'],
		boxShadow: `0 ${rem(10)} ${colors['dark-purple']}`,
	}),
	height: rem(78),
	border: `${rem(3)} solid ${colors.black}`,
	borderRadius: rem(20),
	paddingInline: rem(20),
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	textAlign: 'start',
	textTransform: 'uppercase',
	whiteSpace: 'nowrap',
	color: colors.black,
	boxShadow: `0 ${rem(10)} ${colors.black}`,
})

export const button = styleVariants({
	yellow: [baseButton, { background: colors.yellow }],
	white: [baseButton, { background: colors.white }],
})

export const playerVsPlayerIcon = style({
	width: rem(82),
	height: rem(46),
})
