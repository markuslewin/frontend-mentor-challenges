import { useLocalStorage, useMediaQuery } from '@uidotdev/usehooks'
import { useLayoutEffect, useMemo } from 'react'
import { z } from 'zod'

const themeKey = 'theme'

const themeSchema = z.enum(['light', 'dark'])

export type Theme = z.infer<typeof themeSchema>

export function useTheme() {
	const [storedTheme, setStoredTheme] = useLocalStorage(themeKey)
	const parsedTheme = useMemo(() => {
		const result = themeSchema.safeParse(storedTheme)
		return result.success ? result.data : null
	}, [storedTheme])
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

	const theme: Theme = parsedTheme ?? (prefersDark ? 'dark' : 'light')

	useLayoutEffect(() => {
		document.documentElement.dataset.theme = theme
		return () => {
			delete document.documentElement.dataset.theme
		}
	}, [theme])

	return {
		theme,
		setTheme(theme: Theme) {
			setStoredTheme(theme)
		},
	} as const
}
