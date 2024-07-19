import { clientSchema, serverSchema } from '#app/utils/env/schemas'

const parsed = serverSchema.merge(clientSchema).safeParse(process.env)
if (!parsed.success) {
	console.error(
		'Invalid environment variables:',
		parsed.error.flatten().fieldErrors,
	)
	throw new Error('Invalid environment variables')
}

export const serverEnv = parsed.data
