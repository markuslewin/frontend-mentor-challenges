import { createContext } from 'react'

export interface Announcement {
	id: string
	message: string
}

export type Announce = (message: string) => void

export const context = createContext<{
	announcements: Announcement[]
	announce: Announce
} | null>(null)
