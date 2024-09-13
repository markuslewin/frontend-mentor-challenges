import { globalStyle } from '@vanilla-extract/css'
import { media } from '#app/utils/screens'
import { body, colors, dataRoute, transition } from '#app/utils/style'

globalStyle('body', {
	...body,
	...transition('color'),
	fontFamily: "'Space Grotesk Variable', sans-serif",
	background: colors.purple,
})
globalStyle(`body[${dataRoute('main-menu')}]`, {
	'@media': {
		[media.tablet]: {
			background: colors['dark-purple'],
		},
	},
})
