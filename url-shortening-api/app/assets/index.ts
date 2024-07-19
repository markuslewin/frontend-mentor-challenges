import { invariant } from '@epic-web/invariant'
import { z } from 'zod'

const assetSchema = z.object({
	src: z.string(),
	width: z.number(),
	height: z.number(),
})

const assets = Object.fromEntries(
	Object.entries(
		import.meta.glob('./**/*.(jpg|png)', {
			query: '?as=metadata',
			eager: true,
		}),
	).map(([path, asset]) => {
		return [path.replace(/^.\//, '/'), assetSchema.parse(asset)]
	}),
)

export function getAsset(path: string) {
	const asset = assets[path]
	invariant(asset !== undefined, `Asset "${path}" not found`)

	return asset
}
