import { globalStyle, style } from '@vanilla-extract/css'
import { media } from '#app/utils/screens'
import { body, colors, dataRoute, transitionBase } from '#app/utils/style'

globalStyle('body', {
	...body,
	...transitionBase,
	fontFamily: "'Space Grotesk Variable', sans-serif",
	background: colors.purple,
	transitionProperty: 'background-color',
})
globalStyle(`body[${dataRoute('main-menu')}]`, {
	'@media': {
		[media.tablet]: {
			background: colors['dark-purple'],
		},
	},
})

export const srOnly = style({
	position: 'absolute',
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: 0,
})
