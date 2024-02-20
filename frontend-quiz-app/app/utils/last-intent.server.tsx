import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { z } from 'zod'
import { combineHeaders } from './misc'

const lastIntentKey = 'last-intent'

const LastIntentSchema = z.object({ 'last-intent': z.enum(['switch-theme']) })

type LastIntentObject = z.infer<typeof LastIntentSchema>
type LastIntent = LastIntentObject['last-intent']

const lastIntentSessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'en_last-intent',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: process.env.SESSION_SECRET.split(','),
		secure: process.env.NODE_ENV === 'production',
	},
})

export async function redirectWithLastIntent(
	url: string,
	lastIntent: LastIntent,
	init?: ResponseInit,
) {
	const lastIntentSession = await lastIntentSessionStorage.getSession()
	lastIntentSession.flash(lastIntentKey, {
		'last-intent': lastIntent,
	} satisfies LastIntentObject)
	return redirect(url, {
		...init,
		headers: combineHeaders(init?.headers, {
			'set-cookie':
				await lastIntentSessionStorage.commitSession(lastIntentSession),
		}),
	})
}

export async function getLastIntent(request: Request) {
	const session = await lastIntentSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const result = LastIntentSchema.safeParse(session.get(lastIntentKey))
	const lastIntent = result.success ? result.data['last-intent'] : null
	console.log('get last intent', { lastIntent }, result.success)
	return {
		lastIntent,
		headers: lastIntent
			? new Headers({
					'set-cookie': await lastIntentSessionStorage.destroySession(session),
				})
			: null,
	}
}
