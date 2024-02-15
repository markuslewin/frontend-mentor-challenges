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
		setMessages([...messages, { id: nextId.current++, text }])
		setTimeout(() => {
			setMessages(messages => messages.slice(1))
		}, 7000)
	}

	return (
		<AnnouncerContext.Provider value={{ announce, messages }}>
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
