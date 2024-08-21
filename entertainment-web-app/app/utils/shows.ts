import { z } from 'zod'
import json from '#app/data/shows.json'

const showsSchema = z.array(
	z.discriminatedUnion('isTrending', [
		z.object({
			isTrending: z.literal(true),
			title: z.string(),
			thumbnail: z.object({
				trending: z.object({
					small: z.string(),
					large: z.string(),
				}),
				regular: z.object({
					small: z.string(),
					medium: z.string(),
					large: z.string(),
				}),
			}),
			year: z.number(),
			category: z.enum(['Movie', 'TV Series']),
			rating: z.string(),
			isBookmarked: z.boolean(),
		}),
		z.object({
			isTrending: z.literal(false),
			title: z.string(),
			thumbnail: z.object({
				regular: z.object({
					small: z.string(),
					medium: z.string(),
					large: z.string(),
				}),
			}),
			year: z.number(),
			category: z.enum(['Movie', 'TV Series']),
			rating: z.string(),
			isBookmarked: z.boolean(),
		}),
	]),
)

export type Shows = z.infer<typeof showsSchema>
export type Show = Shows[number]
export type Category = Show['category']

export const shows = showsSchema.parse(json)
