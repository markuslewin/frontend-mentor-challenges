import { createId } from '@paralleldrive/cuid2'
import { z } from 'zod'
import { getItem, setItem } from './json-storage'

const messagesKey = 'messages'

const MessageSchema = z.array(z.object({ id: z.string(), text: z.string() }))

type Messages = z.infer<typeof MessageSchema>
type Message = Messages[number]
type MessageId = Message['id']
type MessageInput = Omit<Message, 'id'>

function setMessages(messages: Messages) {
	setItem(messagesKey, messages)
}

export function getMessages() {
	const item = getItem(messagesKey)
	if (item === null) return null

	const messages = MessageSchema.parse(item)

	return messages
}

export function createMessage({ text }: MessageInput) {
	const messages = getMessages()
	const message: Message = {
		id: createId(),
		text,
	}

	setMessages(messages === null ? [message] : [...messages, message])
}

export function getMessage(id: MessageId) {
	const messages = getMessages()
	if (messages === null) return null

	return messages.find((message) => message.id === id)
}

export function updateMessage(id: MessageId, { text }: MessageInput) {
	const messages = getMessages()
	if (messages === null) return

	setMessages(
		messages.map((message) =>
			message.id === id ? { ...message, text } : message,
		),
	)
}

export function deleteMessage(id: MessageId) {
	const messages = getMessages()
	if (messages === null) return

	setMessages(messages.filter((message) => message.id !== id))
}
