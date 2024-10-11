import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ asChild, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className="mt-4 rounded-xl bg-button text-button-foreground transition-colors shape-py-3 shape-px-5 aria-disabled:!bg-button/50 hocus:bg-button-hocus"
				ref={ref}
				{...props}
			/>
		)
	},
)
