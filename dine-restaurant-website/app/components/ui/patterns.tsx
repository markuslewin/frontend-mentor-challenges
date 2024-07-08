import curveBottomRight from '#app/assets/patterns/pattern-curve-bottom-right.svg'
import curveTopLeft from '#app/assets/patterns/pattern-curve-top-left.svg'
import curveTopRight from '#app/assets/patterns/pattern-curve-top-right.svg'
import lines from '#app/assets/patterns/pattern-lines.svg'

export function CurveBottomRight() {
	return (
		<img
			alt=""
			loading="lazy"
			src={curveBottomRight}
			width="993"
			height="320"
		/>
	)
}

export function CurveTopRight() {
	return (
		<img alt="" loading="lazy" src={curveTopRight} width="895" height="320" />
	)
}

export function CurveTopLeft() {
	return (
		<img alt="" loading="lazy" src={curveTopLeft} width="895" height="320" />
	)
}

export function Lines() {
	return <img alt="" loading="lazy" src={lines} width="160" height="76" />
}
