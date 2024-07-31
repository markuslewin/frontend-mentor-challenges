import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Form, useActionData } from 'react-router-dom'
import { Button } from '#app/components/button'
import { Input } from '#app/components/input'
import { AddMessageSchema } from '#app/routes/nested-routes.create/routing'

export function NestedRoutesCreate() {
	const lastResult = useActionData() as any
	const [form, fields] = useForm({
		constraint: getZodConstraint(AddMessageSchema),
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AddMessageSchema })
		},
	})

	return (
		<>
			<h2 className="text-heading-m">Add a message</h2>
			<Form className="mt-8 max-w-sm" {...getFormProps(form)} method="post">
				<div>
					<label htmlFor={fields.text.id}>Text:</label>
					<Input {...getInputProps(fields.text, { type: 'text' })} />
					<p className="text-red-500 mt-1" id={fields.text.errorId}>
						{fields.text.errors}
					</p>
				</div>
				<Button type="submit">Add message</Button>
			</Form>
		</>
	)
}
