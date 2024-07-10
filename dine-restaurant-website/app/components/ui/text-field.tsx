import { cva, type VariantProps } from 'class-variance-authority'
import { type InputHTMLAttributes } from 'react'

const variants = cva(
	'border-b px-4 pb-[0.875rem] transition-colors placeholder:text-[inherit] placeholder:opacity-50 hocus:border-cod-gray',
	{
		variants: {
			variant: { normal: 'border-[hsl(0_0%_56%)]', error: 'border-red' },
		},
		defaultVariants: { variant: 'normal' },
	},
)

interface TextFieldProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof variants> {}

export function TextField({ className, variant, ...props }: TextFieldProps) {
	return <input {...props} className={variants({ className, variant })} />
}
