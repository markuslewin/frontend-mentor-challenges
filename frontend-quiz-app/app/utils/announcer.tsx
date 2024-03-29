import {
	type ReactNode,
	createContext,
	useContext,
	useRef,
	useState,
} from 'react'

const AnnouncerContext = createContext<{
	announce(text: string): void
	messages: Message[]
} | null>(null)

export function useAnnouncer() {
	const value = useContext(AnnouncerContext)
	if (value === null) {
		throw new Error(
			'Hook `useAnnouncer` must be used inside `AnnouncerProvider`.',
		)
	}
	return value
}

export function AnnouncerProvider({ children }: { children: ReactNode }) {
	const [messages, setMessages] = useState<Message[]>([])
	const nextId = useRef(0)

	function announce(text: string) {
		const id = nextId.current++
		setMessages(messages => {
			return [...messages, { id, text }]
		})
		setTimeout(() => {
			setMessages(messages => {
				return messages.filter(message => message.id !== id)
			})
		}, 7000)
	}
	const announceRef = useRef(announce)

	return (
		<AnnouncerContext.Provider
			value={{ announce: announceRef.current, messages }}
		>
			{children}
		</AnnouncerContext.Provider>
	)
}

export function MessageQueue() {
	const { messages } = useAnnouncer()
	return (
		<div className="sr-only" aria-live="polite">
			{messages.map(message => {
				return <p key={message.id}>{message.text}</p>
			})}
		</div>
	)
}

type Message = {
	id: number
	text: string
}
