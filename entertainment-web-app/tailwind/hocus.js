import plugin from 'tailwindcss/plugin'

// Hover + focus = hocus
export const hocus = plugin(({ addVariant }) => {
	addVariant('hocus', ['&:hover', '&:focus-visible'])
	addVariant('group-hocus', [
		':merge(.group):hover &',
		':merge(.group):focus-visible &',
	])
	addVariant('peer-hocus', [
		':merge(.peer):hover ~ &',
		':merge(.peer):focus-visible ~ &',
	])
})
