import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Form, useActionData, useLoaderData } from 'react-router-dom'
import { Button } from '#app/components/button'
import { Input } from '#app/components/input'
import {
	type LoaderData,
	UpdateMessageSchema,
} from '#app/routes/nested-routes.update.$id/routing'

export function NestedRoutesUpdate() {
	const { message } = useLoaderData() as LoaderData
	const lastResult = useActionData() as any
	const [form, fields] = useForm({
		constraint: getZodConstraint(UpdateMessageSchema),
		lastResult,
		defaultValue: message,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UpdateMessageSchema })
		},
	})

	return (
		<>
			<h2 className="text-heading-m">Update</h2>
			<Form className="mt-8 max-w-sm" {...getFormProps(form)} method="post">
				<input {...getInputProps(fields.id, { type: 'hidden' })} />
				<div>
					<label htmlFor={fields.text.id}>Text: </label>
					<Input {...getInputProps(fields.text, { type: 'text' })} />
					<p className="text-red-500 mt-1" id={fields.text.errorId}>
						{fields.text.errors}
					</p>
				</div>
				<Button type="submit">Update message</Button>
			</Form>
		</>
	)
}
