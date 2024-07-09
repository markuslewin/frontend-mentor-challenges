import curveBottomRight from '#app/assets/patterns/pattern-curve-bottom-right.svg'
import curveTopLeft from '#app/assets/patterns/pattern-curve-top-left.svg'
import curveTopRight from '#app/assets/patterns/pattern-curve-top-right.svg'
import lines from '#app/assets/patterns/pattern-lines.svg'

export interface PatternProps {
	className?: string
}

export function CurveBottomRight(props: PatternProps) {
	return (
		<img
			alt=""
			loading="lazy"
			src={curveBottomRight}
			width="993"
			height="320"
			{...props}
		/>
	)
}

export function CurveTopRight(props: PatternProps) {
	return (
		<img
			alt=""
			loading="lazy"
			src={curveTopRight}
			width="895"
			height="320"
			{...props}
		/>
	)
}

export function CurveTopLeft(props: PatternProps) {
	return (
		<img
			alt=""
			loading="lazy"
			src={curveTopLeft}
			width="895"
			height="320"
			{...props}
		/>
	)
}

export function Lines(props: PatternProps) {
	return (
		<img alt="" loading="lazy" src={lines} width="160" height="76" {...props} />
	)
}
