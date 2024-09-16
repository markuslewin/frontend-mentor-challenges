import { style, type StyleRule } from '@vanilla-extract/css'
import { media } from '#app/utils/screens'
import {
	colors,
	transition,
	rem,
	hocus,
	headingXs,
	headingS,
	headingL,
	headingM,
} from '#app/utils/style'

export const center = style({
	boxSizing: 'content-box',
	marginInline: 'auto',
	maxInlineSize: rem(632),
	paddingInline: rem(20),
	'@media': {
		[media.desktop]: {
			maxInlineSize: rem(1040),
		},
	},
})

const gameLayoutColumns = {
	gridTemplateColumns: `${rem(147)} minmax(auto, ${rem(632)}) ${rem(147)}`,
	gridTemplateAreas: '"left center right"',
	justifyContent: 'space-between',
} satisfies StyleRule

export const headerGrid = style({
	'@media': {
		[media.desktop]: {
			...gameLayoutColumns,
			display: 'grid',
		},
	},
})

export const headerLayout = style({
	gridArea: 'center',
	display: 'flex',
	alignItems: 'center',
	paddingBlockStart: rem(47),
	'@media': {
		[media.tablet]: {
			paddingBlockStart: rem(27),
		},
		[media.desktop]: {
			paddingBlockStart: rem(50),
		},
	},
})

export const headerSide = style({
	flex: '1 0 0',
})

export const headerRightSide = style([
	headerSide,
	{ order: 2, display: 'flex', justifyContent: 'end' },
])

export const logoContainer = style({
	order: 1,
})

export const gameLayout = style({
	marginBlockStart: rem(41),
	marginBlockEnd: `-${rem(15)}`,
	display: 'grid',
	gridTemplateAreas: `
	"left right"
	"center center"
	`,
	rowGap: rem(47),
	columnGap: rem(15),
	'@media': {
		[media.tablet]: {
			marginBlockStart: rem(23),
			marginBlockEnd: `-${rem(50)}`,
			rowGap: rem(29),
			columnGap: rem(35),
		},
		[media.desktop]: {
			...gameLayoutColumns,
			marginBlockStart: rem(8),
			gap: 0,
			alignItems: 'center',
		},
	},
})

export const logo = style({
	width: rem(46),
	height: rem(49),
	'@media': {
		[media.tablet]: {
			width: rem(58),
			height: rem(61),
		},
	},
})

export const button = style({
	...headingXs,
	...transition('color'),
	...hocus({
		background: colors.red,
	}),
	borderRadius: 9999,
	paddingBlock: rem(9),
	paddingInline: rem(20),
	textTransform: 'uppercase',
	background: colors['dark-purple'],
	color: colors.white,
})

const scoreCard = style({
	position: 'relative',
	isolation: 'isolate',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	border: `${rem(3)} solid ${colors.black}`,
	borderRadius: rem(20),
	padding: rem(10),
	background: colors.white,
	color: colors.black,
	boxShadow: `0 ${rem(10)} ${colors.black}`,
	'@media': {
		[media.tablet]: {
			justifyContent: 'space-between',
			paddingBlock: rem(15),
			paddingInline: rem(40),
		},
		[media.desktop]: {
			flexDirection: 'column',
			paddingBlockStart: rem(46),
			paddingBlockEnd: rem(17),
			paddingInline: 0,
		},
	},
})

export const playerOneCard = style([
	scoreCard,
	{
		gridArea: 'left',
		marginInlineStart: rem(13),
		'@media': {
			[media.tablet]: {
				flexDirection: 'row',
				marginInlineStart: rem(20),
			},
		},
	},
])

export const playerTwoCard = style([
	scoreCard,
	{
		gridArea: 'right',
		marginInlineEnd: rem(13),
		'@media': {
			[media.tablet]: {
				flexDirection: 'row-reverse',
				marginInlineEnd: rem(20),
			},
		},
	},
])

const playerAvatar = style({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	width: rem(54),
	height: rem(59),
	'@media': {
		[media.desktop]: {
			top: `-${rem(24)}`,
			left: '50%',
			transform: 'translateX(-50%)',
		},
	},
})

export const playerOneAvatar = style([
	playerAvatar,
	{
		left: `-${rem(24)}`,
	},
])

export const playerTwoAvatar = style([
	playerAvatar,
	{
		right: `-${rem(24)}`,
		'@media': {
			[media.desktop]: {
				right: 'auto',
			},
		},
	},
])

export const playerName = style({
	...headingXs,
	textTransform: 'uppercase',
	'@media': {
		[media.tablet]: {
			...headingS,
		},
	},
})

export const score = style({
	fontSize: rem(32),
	fontWeight: 700,
	lineHeight: rem(41),
	'@media': {
		[media.tablet]: {
			...headingL,
		},
	},
})

export const boardContainer = style({
	gridArea: 'center',
})

export const board = style({
	position: 'relative',
})

export const boardBack = style({
	width: '100%',
	height: 'auto',
})

function percentage(fraction: number) {
	return `${fraction * 100}%`
}

export const counters = style({
	position: 'absolute',
	inset: `${percentage(7 / 320)} ${percentage(7 / 335)} ${percentage(34 / 320)}`,
	display: 'grid',
	gridTemplateColumns: `repeat(7, ${percentage(40 / 320)})`,
	gridTemplateRows: `repeat(6, ${percentage(45 / 279)})`,
	placeContent: 'space-between',
	'@media': {
		[media.tablet]: {
			inset: `${percentage(17 / 594)} ${percentage(17 / 632)} ${percentage(62 / 594)}`,
			gridTemplateColumns: `repeat(7, ${percentage(70 / 598)})`,
			gridTemplateRows: `repeat(6, ${percentage(75 / 515)})`,
		},
	},
})

export const boardFront = style({
	position: 'absolute',
	inset: '0 0 auto 0',
	width: '100%',
	height: 'auto',
})

export const counter = style({
	width: '100%',
	height: 'auto',
})

export const marker = style({
	width: rem(38),
	height: rem(36),
})

export const backgroundLight = style({
	borderStartStartRadius: rem(60),
	borderStartEndRadius: rem(60),
	paddingBlockEnd: rem(83),
	// todo: https://vanilla-extract.style/documentation/packages/dynamic/#assigninlinevars
	background: colors['dark-purple'],
	'@media': {
		[media.tablet]: {
			paddingBlockEnd: rem(71),
		},
		[media.desktop]: {
			paddingBlockEnd: rem(37),
		},
	},
})

export const turn = style({
	marginInline: 'auto',
	maxInlineSize: rem(197),
	display: 'grid',
	gridTemplateRows: '43fr 122fr',
	transform: `translateY(-${rem(12)})`,
	'@media': {
		[media.tablet]: {
			transform: `translateY(-${rem(2)})`,
		},
	},
})

export const turnBackground = style({
	gridRow: '1 / -1',
	gridColumn: 1,
	width: '100%',
	height: 'auto',
})

export const turnText = style({
	gridRow: 2,
	gridColumn: 1,
	textAlign: 'center',
})

export const turnPlayer = style({
	...headingXs,
	textTransform: 'uppercase',
	// todo: Red background?
	color: colors.white,
})

export const turnTimer = style({
	...headingL,
	// todo: Red background?
	color: colors.white,
})

export const dialogOverlay = style({
	position: 'fixed',
	inset: 0,
	display: 'grid',
	gridTemplateColumns: `minmax(auto, ${rem(486)})`,
	justifyContent: 'center',
	alignItems: 'center',
	padding: rem(20),
	overflowY: 'auto',
	background: `hsl(0 0% 0% / 50%)`,
})

export const dialogContent = style({
	border: `${rem(3)} solid ${colors.black}`,
	borderRadius: rem(40),
	padding: `${rem(30)} ${rem(17)} ${rem(27)}`,
	background: colors.purple,
	color: colors.white,
	boxShadow: `0 ${rem(10)} ${colors.black}`,
	'@media': {
		[media.tablet]: {
			padding: `${rem(50)} ${rem(37)} ${rem(47)}`,
		},
	},
})

export const dialogTitle = style({
	...headingL,
	textTransform: 'uppercase',
	textAlign: 'center',
})

export const dialogOptions = style({
	marginBlockStart: rem(27),
	display: 'grid',
	gap: rem(24),
	'@media': {
		[media.tablet]: {
			marginBlockStart: rem(41),
		},
	},
})

export const dialogOption = style({
	display: 'grid',
})

const dialogButton = style({
	...headingM,
	...hocus({
		borderColor: colors['dark-purple'],
		boxShadow: `0 ${rem(10)} ${colors['dark-purple']}`,
	}),
	...transition('color', 'shadow'),
	border: `${rem(3)} solid ${colors.black}`,
	borderRadius: rem(20),
	paddingBlockStart: rem(21),
	paddingBlockEnd: rem(20),
	textAlign: 'center',
	textTransform: 'uppercase',
	boxShadow: `0 ${rem(10)} ${colors.black}`,
})

export const whiteDialogButton = style([
	dialogButton,
	{
		background: colors.white,
		color: colors.black,
	},
])

export const redDialogButton = style([
	dialogButton,
	{
		background: colors.red,
		color: colors.white,
	},
])
