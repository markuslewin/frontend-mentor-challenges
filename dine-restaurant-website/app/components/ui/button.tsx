import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ReactNode, type ButtonHTMLAttributes } from 'react'

const variants = cva(
	'inline-block text-center text-heading-s uppercase leading-[1rem] transition-colors shape-p-6 shape-border aria-disabled:opacity-25',
	{
		variants: {
			variant: {
				onDark: 'border-white text-white hocus:bg-white hocus:text-mirage',
				onLight:
					'border-cod-gray bg-cod-gray text-white hocus:bg-[transparent] hocus:text-cod-gray',
			},
		},
		defaultVariants: {
			variant: 'onLight',
		},
	},
)

export interface RootProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof variants> {
	asChild?: boolean
}

export function Root({ asChild, className, variant, ...props }: RootProps) {
	const Comp = asChild ? Slot : 'button'
	return <Comp {...props} className={variants({ className, variant })} />
}

export interface TextProps {
	children: ReactNode
}

export function Text({ children }: TextProps) {
	return <span className="inline-block translate-y-[0.059em]">{children}</span>
}
