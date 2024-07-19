import { Slot } from '@radix-ui/react-slot'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean
}

export function Button({ asChild, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : 'button'
	return (
		<Comp
			className="mt-4 rounded-xl bg-button text-button-foreground transition-colors shape-px-5 shape-py-3 aria-disabled:!bg-button/50 hocus:bg-button-hocus"
			{...props}
		/>
	)
}
