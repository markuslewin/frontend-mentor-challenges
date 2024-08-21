import { calculateClamp } from 'utopia-core'

export function clamp(minSize, maxSize) {
	return calculateClamp({
		minWidth: 375,
		maxWidth: 768,
		minSize,
		maxSize,
	})
}
