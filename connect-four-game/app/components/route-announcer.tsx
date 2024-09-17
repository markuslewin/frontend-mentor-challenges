import { useEffect, useRef, useState } from 'react'
import { useLocation, useMatches } from 'react-router-dom'
import { z } from 'zod'
import { srOnly } from '#app/styles.css'

const AnnouncementHandleSchema = z.object({
	announcement: z.function().args(z.unknown()).returns(z.string()),
})

export type AnnouncementHandle<T = unknown> = { announcement(data: T): string }

// https://github.com/vercel/next.js/blob/canary/packages/next/src/client/route-announcer.tsx
export function RouteAnnouncer() {
	const matches = useMatches()
	const { pathname } = useLocation()
	const [announcement, setAnnouncement] = useState('')
	const previousPath = useRef(pathname)

	useEffect(() => {
		if (previousPath.current === pathname) return
		previousPath.current = pathname

		let nextAnnouncement: string | null = null
		for (const match of [...matches].reverse()) {
			const result = AnnouncementHandleSchema.safeParse(match.handle)
			if (!result.success) continue

			nextAnnouncement = result.data.announcement(match.data)
			break
		}

		setAnnouncement(nextAnnouncement ?? '')
	}, [matches, pathname])

	return (
		<p className={srOnly} aria-live="assertive" role="alert">
			{announcement}
		</p>
	)
}
