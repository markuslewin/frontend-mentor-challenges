import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint } from '@conform-to/zod'
import { Form, Link, useLoaderData } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import {
	DeleteMessageSchema,
	type loader,
} from '#app/routes/nested-routes._index/routing'

export function NestedRoutesIndex() {
	const { messages } = useLoaderData() as ReturnType<typeof loader>

	return (
		<>
			<h2 className="text-heading-m">Messages</h2>
			<ul className="mt-8">
				{messages.map((message) => (
					<li
						className="mt-4 grid grid-cols-[max-content_1fr] items-center gap-2"
						key={message.id}
					>
						<Delete id={message.id} />
						<Link
							className="underline underline-offset-4 hocus:no-underline"
							to={`/nested-routes/update/${message.id}`}
						>
							{message.text}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

function Delete({ id }: { id: string }) {
	const [form, fields] = useForm({
		constraint: getZodConstraint(DeleteMessageSchema),
		defaultValue: { id },
	})

	return (
		<Form {...getFormProps(form)} method="post">
			<input {...getInputProps(fields.id, { type: 'hidden' })} />
			<button
				className="grid size-10 place-items-center text-delete-foreground transition-colors hocus:text-delete-foreground-hocus"
				type="submit"
			>
				<Icon className="size-5" name="trash" />
				<span className="sr-only">Delete message</span>
			</button>
		</Form>
	)
}
