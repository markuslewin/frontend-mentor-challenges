import { clientSchema } from '#app/utils/env/schemas'

const parsed = clientSchema.safeParse(import.meta.env)
if (!parsed.success) {
	console.error(
		'Invalid environment variables:',
		parsed.error.flatten().fieldErrors,
	)
	throw new Error('Invalid environment variables')
}

export const clientEnv = parsed.data
