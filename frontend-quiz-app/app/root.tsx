import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
// Supports weights 300-900
import rubikHref from '@fontsource-variable/rubik/index.css'
import rubikItalicHref from '@fontsource-variable/rubik/wght-italic.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
	json,
	type ActionFunctionArgs,
	type HeadersFunction,
	type LinksFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
	redirect,
} from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useNavigation,
} from '@remix-run/react'
import { withSentry } from '@sentry/remix'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { safeRedirect } from 'remix-utils/safe-redirect'
import { z } from 'zod'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import { EpicProgress } from './components/progress-bar.tsx'
import { href as iconsHref } from './components/ui/icon.tsx'
import { EpicToaster } from './components/ui/sonner.tsx'
import tailwindStyleSheetUrl from './styles/tailwind.css'
import { AnnouncerProvider, MessageQueue } from './utils/announcer.tsx'
import { ClientHintCheck, getHints, useHints } from './utils/client-hints.tsx'
import { getEnv } from './utils/env.server.ts'
import { honeypot } from './utils/honeypot.server.ts'
import { getDomainUrl } from './utils/misc.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import { useRequestInfo } from './utils/request-info.ts'
import { getTheme, setTheme, type Theme } from './utils/theme.server.ts'

export const links: LinksFunction = () => {
	return [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: iconsHref, as: 'image' },
		// Preload CSS as a resource to avoid render blocking
		{ rel: 'preload', href: tailwindStyleSheetUrl, as: 'style' },
		cssBundleHref ? { rel: 'preload', href: cssBundleHref, as: 'style' } : null,
		{
			rel: 'icon',
			type: 'image/png',
			href: '/favicons/favicon-32x32.png',
		},
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const, // necessary to make typescript happy
		//These should match the css preloads above to avoid css as render blocking resource
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
		cssBundleHref ? { rel: 'stylesheet', href: cssBundleHref } : null,
		{ rel: 'stylesheet', href: rubikHref },
		{ rel: 'stylesheet', href: rubikItalicHref },
	].filter(Boolean)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: 'Frontend Mentor | Frontend quiz app' }]
}

export async function loader({ request }: LoaderFunctionArgs) {
	const honeyProps = honeypot.getInputProps()

	return json({
		requestInfo: {
			hints: getHints(request),
			origin: getDomainUrl(request),
			path: new URL(request.url).pathname,
			userPrefs: {
				theme: getTheme(request),
			},
		},
		ENV: getEnv(),
		honeyProps,
	})
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
	const headers = {
		'Server-Timing': loaderHeaders.get('Server-Timing') ?? '',
	}
	return headers
}

const ThemeFormSchema = z.object({
	theme: z.enum(['light', 'dark']),
	redirectTo: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ThemeFormSchema,
	})

	invariantResponse(submission.status === 'success', 'Invalid theme received')

	const { theme, redirectTo } = submission.value

	const responseInit = {
		headers: { 'set-cookie': setTheme(theme) },
	}
	return redirect(safeRedirect(redirectTo), responseInit)
}

function Document({
	children,
	nonce,
	theme = 'light',
	env = {},
}: {
	children: React.ReactNode
	nonce: string
	theme?: Theme
	env?: Record<string, string>
}) {
	return (
		<html lang="en" className={`${theme} h-full overflow-x-hidden`}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Links />
			</head>
			<body className="bg-background bg-body-pattern-light bg-cover bg-center bg-no-repeat font-body text-[0.875rem] text-foreground dark:bg-body-pattern-dark tablet:bg-body-pattern-light-tablet tablet:bg-auto tablet:bg-left-top tablet:text-body-s dark:tablet:bg-body-pattern-dark-tablet desktop:bg-body-pattern-light-desktop desktop:bg-cover desktop:bg-center dark:desktop:bg-body-pattern-dark-desktop">
				{children}
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
				<LiveReload nonce={nonce} />
			</body>
		</html>
	)
}

function App() {
	const data = useLoaderData<typeof loader>()
	const nonce = useNonce()
	const theme = useTheme()

	return (
		<Document nonce={nonce} theme={theme} env={data.ENV}>
			<div className="flex min-h-screen flex-col justify-between pb-16">
				<Outlet />
			</div>
			<EpicToaster closeButton position="top-center" theme={theme} />
			<EpicProgress />
			<MessageQueue />
		</Document>
	)
}

function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
		<AnnouncerProvider>
			<HoneypotProvider {...data.honeyProps}>
				<App />
			</HoneypotProvider>
		</AnnouncerProvider>
	)
}

export default withSentry(AppWithProviders)

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	return optimisticMode ?? requestInfo.userPrefs.theme ?? hints.theme
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
	const navigation = useNavigation()

	if (navigation.formData) {
		const submission = parseWithZod(navigation.formData, {
			schema: ThemeFormSchema,
		})

		if (submission.status === 'success') {
			return submission.value.theme
		}
	}
}

export function ErrorBoundary() {
	// the nonce doesn't rely on the loader so we can access that
	const nonce = useNonce()

	// NOTE: you cannot use useLoaderData in an ErrorBoundary because the loader
	// likely failed to run so we have to do the best we can.
	// We could probably do better than this (it's possible the loader did run).
	// This would require a change in Remix.

	// Just make sure your root route never errors out and you'll always be able
	// to give the user a better UX.

	return (
		<Document nonce={nonce}>
			<GeneralErrorBoundary />
		</Document>
	)
}
