import plugin from 'tailwindcss/plugin'

// The world-famous grid
export const theGrid = plugin(({ matchUtilities, theme }) => {
	matchUtilities(
		{
			'the-grid': (width) => {
				return {
					display: 'grid',
					gridTemplateColumns: `repeat(auto-fill, minmax(min(${width}, 100%), 1fr))`,
				}
			},
		},
		{ values: theme('width') },
	)
})
