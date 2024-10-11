import { calculateClamp } from 'utopia-core'

export function clamp(minSize, maxSize) {
	return calculateClamp({
		minWidth: 375,
		maxWidth: 1110,
		minSize,
		maxSize,
	})
}
