interface ShadowTextProps {
	text: string
}

export function ShadowText({ text }: ShadowTextProps) {
	return (
		<span className="relative isolate block">
			<span
				className="absolute inset-0 -z-10 [-webkit-text-stroke:0.5rem_hsl(216_28%_20%)] tablet:[-webkit-text-stroke:1rem_hsl(216_28%_20%)]"
				aria-hidden="true"
			>
				{text}
			</span>
			<span className="bg-gradient-to-b from-[hsl(209_100%_70%)] to-white bg-clip-text text-transparent">
				{text}
			</span>
		</span>
	)
}
