import plugin from 'tailwindcss/plugin'

// Increases target size of clickable elements
export const clickable = plugin(({ matchUtilities, theme }) => {
	matchUtilities(
		{
			clickable: (size) => {
				return {
					position: 'relative',
					isolation: 'isolate',
					'&::before': {
						content: "''",
						display: 'block',
						width: size,
						height: size,
						position: 'absolute',
						'z-index': -1,
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					},
				}
			},
		},
		{ values: theme('size') },
	)
})
