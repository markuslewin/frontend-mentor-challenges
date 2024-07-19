import plugin from 'tailwindcss/plugin'

const defaultWidth = '1px'

const borderWidth = `var(--shape-border-width, ${defaultWidth})`
const common = {
	borderWidth,
	borderColor: 'var(--shape-color, transparent)',
}

function getPadding(size) {
	return `calc(${size} - ${borderWidth})`
}

// Draws outlines for borderless shapes during forced-colors
export const shape = plugin(({ matchUtilities, theme }) => {
	matchUtilities(
		{
			'shape-p': (size) => {
				return {
					padding: getPadding(size),
					...common,
				}
			},
			'shape-py': (size) => {
				return {
					'padding-top': getPadding(size),
					'padding-bottom': getPadding(size),
					...common,
				}
			},
			'shape-px': (size) => {
				return {
					'padding-left': getPadding(size),
					'padding-right': getPadding(size),
					...common,
				}
			},
			'shape-pt': (size) => {
				return {
					'padding-top': getPadding(size),
					...common,
				}
			},
			'shape-pr': (size) => {
				return {
					'padding-right': getPadding(size),
					...common,
				}
			},
			'shape-pb': (size) => {
				return {
					'padding-bottom': getPadding(size),
					...common,
				}
			},
			'shape-pl': (size) => {
				return {
					'padding-left': getPadding(size),
					...common,
				}
			},
		},
		{ values: theme('size') },
	)

	matchUtilities(
		{
			'shape-border': (borderWidth) => {
				return {
					'--shape-border-width': borderWidth,
				}
			},
		},
		{ values: theme('borderWidth') },
	)

	matchUtilities(
		{
			'shape-color': (borderColor) => {
				return {
					'--shape-color': borderColor,
				}
			},
		},
		{ values: theme('borderColor') },
	)
})
