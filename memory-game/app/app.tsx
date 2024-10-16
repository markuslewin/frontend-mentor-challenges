import { getCollectionProps, getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariant } from '@epic-web/invariant'
import {
	faAnchor,
	faBug,
	faFlask,
	faFutbolBall,
	faHandSpock,
	faMoon,
	faSnowflake,
	faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Dialog from '@radix-ui/react-dialog'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useState } from 'react'
import { z } from 'zod'
import { AnnouncementProvider } from '#app/components/announcer'
import * as Landmark from '#app/components/landmark'
import { media } from '#app/utils/screens'

const iconStyle = { width: 'auto', height: '3.5rem' }

const themes = ['numbers', 'icons'] as const
const themeSchema = z.enum(themes)

function isTheme(val: any): val is Theme {
	return themes.includes(val)
}

function assertTheme(val: any): asserts val is Theme {
	invariant(isTheme(val), `Invalid theme: ${val}`)
}

const players = ['1', '2', '3', '4'] as const
const playersSchema = z.enum(players)

const grids = ['4x4', '6x6'] as const
const gridSchema = z.enum(grids)

const startGameSchema = z.object({
	theme: themeSchema,
	players: playersSchema,
	grid: gridSchema,
})

type Theme = z.infer<typeof themeSchema>
type Options = z.infer<typeof startGameSchema>
type Screen = { type: 'start-game' } | { type: 'play'; options: Options }

type Writeable<T> = { -readonly [K in keyof T]: T[K] }

function getThemeName(id: Theme) {
	if (id === 'icons') {
		return 'Icons'
	} else if (id === 'numbers') {
		return 'Numbers'
	} else {
		throw new Error(`Invalid ID: ${id}`)
	}
}

function Memory() {
	const [screen, setScreen] = useState<Screen>({ type: 'start-game' })
	const tabletMatches = useMediaQuery(media.tablet)
	const desktopMatches = useMediaQuery(media.desktop)
	const [form, fields] = useForm({
		constraint: getZodConstraint(startGameSchema),
		defaultValue: {
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		} satisfies Options,
		onSubmit(event, { formData }) {
			event.preventDefault()

			const submission = parseWithZod(formData, { schema: startGameSchema })
			invariant(
				submission.status === 'success',
				`Invalid form submission: ${JSON.stringify(submission.reply())}`,
			)

			setScreen({
				type: 'play',
				options: submission.value,
			})
		},
	})

	if (screen.type === 'start-game') {
		return (
			<main>
				<h1 className="text-new-title">memory</h1>
				<form {...getFormProps(form)}>
					<fieldset>
						<legend>Select Theme</legend>
						{getCollectionProps(fields.theme, {
							type: 'radio',
							options: themes as Writeable<typeof themes>,
							value: true,
						}).map((props) => {
							const { key, ...ps } = props
							assertTheme(props.value)

							return (
								<label key={key}>
									<input {...ps} />
									<span>{getThemeName(props.value)}</span>
								</label>
							)
						})}
					</fieldset>
					<fieldset>
						<legend>Number of Players</legend>
						{getCollectionProps(fields.players, {
							type: 'radio',
							options: players as Writeable<typeof players>,
							value: true,
						}).map((props) => {
							const { key, ...ps } = props

							return (
								<label key={key}>
									<input {...ps} />
									<span>{ps.value}</span>
								</label>
							)
						})}
					</fieldset>
					<fieldset>
						<legend>Grid Size</legend>
						{getCollectionProps(fields.grid, {
							type: 'radio',
							options: grids as Writeable<typeof grids>,
							value: true,
						}).map((props) => {
							const { key, ...ps } = props

							return (
								<label key={key}>
									<input {...ps} />
									<span>{ps.value}</span>
								</label>
							)
						})}
					</fieldset>
					<button type="submit">Start Game</button>
				</form>
			</main>
		)
	} else if (screen.type === 'play') {
		const tiles = [
			[faFutbolBall, faAnchor, faFlask, faSun],
			[faMoon, faSnowflake, faHandSpock, faBug],
			[faFutbolBall, faAnchor, faFlask, faSun],
			[faMoon, faSnowflake, faHandSpock, faBug],
			// faCar,
			// faLiraSign,
		]
		const isSinglePlayer = screen.options && screen.options.players === '1'

		return (
			<>
				<header>
					<h1>Memory</h1>
					{tabletMatches ? (
						<ul role="list">
							<li>
								<button type="button">Restart</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() => {
										setScreen({ type: 'start-game' })
									}}
								>
									New Game
								</button>
							</li>
						</ul>
					) : (
						<Dialog.Root>
							<Dialog.Trigger className="rounded bg-white text-violet11 shadow-blackA4 hover:bg-mauve3 focus:shadow-black inline-flex h-[35px] items-center justify-center px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:outline-none">
								Menu
							</Dialog.Trigger>
							<Dialog.Portal>
								<Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
								<Dialog.Content className="rounded-md bg-white data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
									<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
										Menu
									</Dialog.Title>
									<Dialog.Description className="text-mauve11 mb-5 mt-2.5 text-[15px] leading-normal">
										What do you want to do?
									</Dialog.Description>
									<ul role="list">
										<li>
											<button type="button">Restart</button>
										</li>
										<li>
											<button
												type="button"
												onClick={() => {
													setScreen({ type: 'start-game' })
												}}
											>
												New Game
											</button>
										</li>
										<li>
											<Dialog.Close>Resume Game</Dialog.Close>
										</li>
									</ul>
								</Dialog.Content>
							</Dialog.Portal>
						</Dialog.Root>
					)}
				</header>
				<main>
					<h2>Tiles</h2>
					<div role="grid">
						{tiles.map((row, y) => (
							<div className="grid grid-cols-4" key={y} role="row">
								{row.map((tile, x) => (
									<div key={x} role="gridcell">
										<button type="button">
											<FontAwesomeIcon icon={tile} style={iconStyle} />
											<span>Tile</span>
										</button>
									</div>
								))}
							</div>
						))}
					</div>
					<Landmark.Root>
						<Landmark.Label>
							<h2 className="text-heading-m mt-24">Score</h2>
						</Landmark.Label>
						{isSinglePlayer ? (
							<>
								<div>
									<h3>Time</h3>
									<p>1:53</p>
								</div>
								<div>
									<h3>Moves</h3>
									<p>39</p>
								</div>
							</>
						) : (
							<ul role="list">
								<li>
									<span>{tabletMatches ? <>Player 1</> : <>P1</>}:</span>{' '}
									<span>4</span>
								</li>
								<li aria-current="true">
									<p>
										<span>{tabletMatches ? <>Player 2</> : <>P2</>}:</span>{' '}
										<span>4</span>
									</p>
									{desktopMatches ? <p>Current turn</p> : null}
								</li>
								<li>
									<span>{tabletMatches ? <>Player 3</> : <>P3</>}:</span>{' '}
									<span>2</span>
								</li>
								<li>
									<span>{tabletMatches ? <>Player 4</> : <>P4</>}:</span>{' '}
									<span>0</span>
								</li>
							</ul>
						)}
					</Landmark.Root>
				</main>
			</>
		)
	} else {
		throw new Error(`Invalid screen: ${screen}`)
	}
}

export function App() {
	return (
		<AnnouncementProvider>
			<Memory />
		</AnnouncementProvider>
	)
}
