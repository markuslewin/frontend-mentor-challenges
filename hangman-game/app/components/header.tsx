import { cx } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import { PinkButtonOverlay } from '#app/components/pink-button'
import { ShadowText } from '#app/components/text-shadow'
import { center, pinkCircleButton } from '#app/utils/styles'

interface HeaderProps {
	heading: string
}

export function Header({ heading }: HeaderProps) {
	return (
		<header className={cx(center, '')}>
			<div className="grid grid-cols-[1fr_auto] items-center tablet:grid-cols-[1fr_auto_1fr]">
				<div>
					<Link className={pinkCircleButton()} to="/">
						<PinkButtonOverlay />
						<Icon
							className="h-auto w-[43.61702127659574%]"
							name="icon-back"
							width="41"
							height="39"
						/>
						<span className="sr-only">Back</span>
					</Link>
				</div>
				<h1 className="text-end text-48 tablet:text-start tablet:text-104 tablet:-tracking-05 desktop:text-136">
					<ShadowText text={heading} />
				</h1>
			</div>
		</header>
	)
}
