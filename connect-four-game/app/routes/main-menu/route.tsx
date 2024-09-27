import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import logoUrl from '#app/assets/logo.svg'
import playerVsPlayerUrl from '#app/assets/player-vs-player.svg'
import { Img } from '#app/components/picture'
import {
	button,
	logo,
	mainContainer,
	menuContainer,
	option,
	options,
	playerVsPlayerIcon,
} from '#app/routes/main-menu/styles.css'
import { useBodyRoute } from '#app/utils/body-route'
import { useConnectFour } from '#app/utils/connect-four'

export function MainMenuRoute() {
	useBodyRoute('main-menu')
	const navigate = useNavigate()
	const connectFour = useConnectFour()

	return (
		<main className={mainContainer}>
			<motion.div
				className={menuContainer}
				initial={{
					opacity: 0,
					scale: 0.8,
				}}
				animate={{
					opacity: 1,
					scale: 1,
				}}
				exit={{
					opacity: 0,
					scale: 0.8,
				}}
			>
				<h1>
					<Img
						className={logo}
						alt="Connect Four"
						src={logoUrl}
						priority
						width="58"
						height="61"
					/>
				</h1>
				<ul className={options} role="list">
					<li className={option}>
						<button
							className={button.yellow}
							type="button"
							onClick={() => {
								connectFour.newGame()
								navigate('/play')
							}}
						>
							Play vs player
							<Img
								className={playerVsPlayerIcon}
								alt=""
								src={playerVsPlayerUrl}
								priority
								width="82px"
								height="46px"
							/>
						</button>
					</li>
					<li className={option}>
						<Link className={button.white} to="/rules">
							Game rules
						</Link>
					</li>
				</ul>
			</motion.div>
		</main>
	)
}
