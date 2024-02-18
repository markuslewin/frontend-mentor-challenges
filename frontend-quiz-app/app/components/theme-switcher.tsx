import { useForm, getFormProps } from '@conform-to/react'
import { useFetcher } from '@remix-run/react'
import { type action, useTheme } from '../root'
import { useAnnouncer } from '../utils/announcer'
import { Icon } from './ui/icon'

export function ThemeSwitch() {
	const fetcher = useFetcher<typeof action>()
	const { announce } = useAnnouncer()

	const [form] = useForm({
		id: 'theme-switch',
		lastResult: fetcher.data?.result,
	})

	const mode = useTheme()
	const nextMode = mode === 'light' ? 'dark' : 'light'

	return (
		<fetcher.Form
			className="text-foreground-theme"
			method="POST"
			action="/"
			{...getFormProps(form)}
			onSubmit={event => {
				event.preventDefault()
				fetcher.submit(event.currentTarget)
				announce(`Color mode is now ${nextMode}.`)
			}}
		>
			<input type="hidden" name="theme" value={nextMode} />
			<div className="flex items-center gap-2 tablet:gap-4">
				<Icon className="size-4 tablet:size-6" name="icon-sun-light" />
				<button
					type="submit"
					className="grid h-5 w-8 items-center rounded-full border-1 bg-purple before:inline-block before:size-3 before:translate-x-1 before:rounded-full before:border-[0.375rem] before:border-pure-white before:transition-transform dark:before:translate-x-[0.9375rem] tablet:h-7 tablet:w-12 tablet:before:size-5 tablet:before:border-[0.625rem] dark:tablet:before:translate-x-[1.4375rem]"
				>
					<span className="sr-only">Enable {nextMode} mode</span>
				</button>
				<Icon className="size-4 tablet:size-6" name="icon-moon-light" />
			</div>
		</fetcher.Form>
	)
}
