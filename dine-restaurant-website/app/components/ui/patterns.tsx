import { cx } from 'class-variance-authority'
import curveBottomRight from '#app/assets/patterns/pattern-curve-bottom-right.svg'
import curveTopLeft from '#app/assets/patterns/pattern-curve-top-left.svg'
import curveTopRight from '#app/assets/patterns/pattern-curve-top-right.svg'
import lines from '#app/assets/patterns/pattern-lines.svg'

export interface PatternProps {
	className?: string
}

export function CurveBottomRight({ className, ...props }: PatternProps) {
	return (
		<img
			className={cx('h-80 w-auto max-w-none', className)}
			alt=""
			loading="lazy"
			src={curveBottomRight}
			width="993"
			height="320"
			{...props}
		/>
	)
}

export function CurveTopRight({ className, ...props }: PatternProps) {
	return (
		<img
			className={cx('h-80 w-auto max-w-none', className)}
			alt=""
			loading="lazy"
			src={curveTopRight}
			width="895"
			height="320"
			{...props}
		/>
	)
}

export function CurveTopLeft({ className, ...props }: PatternProps) {
	return (
		<img
			className={cx('h-80 w-auto max-w-none', className)}
			alt=""
			loading="lazy"
			src={curveTopLeft}
			width="895"
			height="320"
			{...props}
		/>
	)
}

export function Lines({ className, ...props }: PatternProps) {
	return (
		<img
			className={cx('h-[4.75rem] w-auto max-w-none', className)}
			alt=""
			loading="lazy"
			src={lines}
			width="160"
			height="76"
			{...props}
		/>
	)
}
