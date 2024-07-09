import { Icon } from '#app/components/icon'

export function Logo() {
	return (
		<span>
			<Icon
				className="h-8 w-auto tablet:h-10"
				name="logo"
				width="103"
				height="40"
			/>
			<span className="sr-only">Dine</span>
		</span>
	)
}
