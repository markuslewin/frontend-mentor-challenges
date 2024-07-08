import plugin from 'tailwindcss/plugin'

// Hover + focus = hocus
export const hocus = plugin(({ addVariant }) => {
	addVariant('hocus', [
		'&:not([aria-disabled=true]):hover',
		'&:not([aria-disabled=true]):focus-visible',
	])
	// todo: Fix for not disabled
	addVariant('group-hocus', [
		':merge(.group):hover &',
		':merge(.group):focus-visible &',
	])
	addVariant('peer-hocus', [
		':merge(.peer):hover ~ &',
		':merge(.peer):focus-visible ~ &',
	])
})
