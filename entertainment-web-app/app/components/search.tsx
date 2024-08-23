import { Icon } from '#app/components/icon'

interface SearchProps {
	placeholder: string
}

export function Search({ placeholder }: SearchProps) {
	return (
		<form className="grid grid-cols-[auto_1fr] items-start gap-4 tablet:gap-6">
			<button className="text-pure-white">
				<Icon className="size-6 tablet:size-8" name="icon-search" />
				<span className="sr-only">Search</span>
			</button>
			<input
				className="w-full border-b border-transparent bg-transparent pb-[0.625rem] text-heading-m text-pure-white transition-colors placeholder:text-pure-white/50 hocus:border-greyish-blue tablet:pb-[0.875rem]"
				type="search"
				name="q"
				placeholder={placeholder}
			/>
		</form>
	)
}
