import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '#app/utils/misc.tsx'

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
		value: number
		max: number
	}
>(({ className, ...props }, ref) => {
	return (
		<ProgressPrimitive.Root
			ref={ref}
			className={cn(
				'rounded-full bg-card p-1 forced-colors:border-1',
				className,
			)}
			{...props}
		>
			<div className="overflow-hidden rounded-full">
				<ProgressPrimitive.Indicator
					className="rounded-full border-[0.25rem] border-purple transition-transform"
					style={{
						transform: `translateX(-${100 - (props.value / props.max) * 100}%)`,
					}}
				/>
			</div>
		</ProgressPrimitive.Root>
	)
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
