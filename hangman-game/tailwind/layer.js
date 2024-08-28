import plugin from 'tailwindcss/plugin'

// Positioned layer
export const layer = plugin(({ matchUtilities, theme }) => {
	matchUtilities(
		{
			layer: (zIndex) => {
				return {
					position: 'absolute',
					inset: '0',
					width: '100%',
					height: '100%',
					zIndex,
				}
			},
		},
		{ values: theme('zIndex') },
	)
})
