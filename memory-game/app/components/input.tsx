import { forwardRef, type ComponentPropsWithoutRef } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<input
			className="mt-2 w-full rounded-xl border-[transparent] bg-input transition-colors shape-py-3 shape-px-5 shape-border-2 hocus:border-input-border-hocus"
			ref={ref}
			{...props}
		/>
	)
})
