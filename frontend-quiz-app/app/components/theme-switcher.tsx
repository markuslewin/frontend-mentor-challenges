import { Form, useLocation, useSubmit } from '@remix-run/react'
import { forwardRef } from 'react'
import { useTheme } from '../root'
import { useAnnouncer } from '../utils/announcer'
import { Icon } from './ui/icon'

export const ThemeSwitch = forwardRef<HTMLButtonElement>(
	function ThemeSwitch(_props, ref) {
		const submit = useSubmit()
		const location = useLocation()
		const { announce } = useAnnouncer()

		const mode = useTheme()
		const nextMode = mode === 'light' ? 'dark' : 'light'

		return (
			<Form
				className="text-foreground-theme"
				method="POST"
				action="/"
				onSubmit={event => {
					event.preventDefault()
					submit(event.currentTarget)
					announce(`Color mode is now ${nextMode}.`)
				}}
			>
				<input type="hidden" name="theme" value={nextMode} />
				<input type="hidden" name="redirectTo" value={location.pathname} />
				<div className="flex items-center gap-2 tablet:gap-4">
					<Icon className="size-4 tablet:size-6" name="icon-sun-light" />
					<button
						className="grid h-5 w-8 items-center rounded-full border-1 bg-purple before:inline-block before:size-3 before:translate-x-1 before:rounded-full before:border-[0.375rem] before:border-pure-white before:transition-transform dark:before:translate-x-[0.9375rem] tablet:h-7 tablet:w-12 tablet:before:size-5 tablet:before:border-[0.625rem] dark:tablet:before:translate-x-[1.4375rem]"
						type="submit"
						ref={ref}
					>
						<span className="sr-only">Enable {nextMode} mode</span>
					</button>
					<Icon className="size-4 tablet:size-6" name="icon-moon-light" />
				</div>
			</Form>
		)
	},
)
