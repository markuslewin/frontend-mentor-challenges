import {
	faAnchor,
	faBug,
	faCar,
	faFlask,
	faFutbolBall,
	faHandSpock,
	faLiraSign,
	faMoon,
	faSnowflake,
	faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnnouncementProvider } from '#app/components/announcer'
import { useState } from 'react'
import { getCollectionProps, getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { z } from 'zod'
import { invariant } from '@epic-web/invariant'

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
const gridsSchema = z.enum(grids)

const startGameSchema = z.object({
	theme: themeSchema,
	players: playersSchema,
	grids: gridsSchema,
})

type Screen = 'start-game' | 'play'
type Theme = z.infer<typeof themeSchema>
type StartGameOptions = z.infer<typeof startGameSchema>

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
	const [screen, setScreen] = useState<Screen>('start-game')
	const [form, fields] = useForm({
		constraint: getZodConstraint(startGameSchema),
		defaultValue: {
			theme: 'numbers',
			players: '1',
			grids: '4x4',
		} satisfies StartGameOptions,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: startGameSchema })
		},
		onSubmit(event, { submission }) {
			event.preventDefault()

			if (submission?.status !== 'success') return

			console.log(submission.value)
			setScreen('play')
		},
	})

	if (screen === 'start-game') {
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
						{getCollectionProps(fields.grids, {
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
	} else if (screen === 'play') {
		return (
			<p className="grid grid-cols-5">
				<FontAwesomeIcon icon={faFutbolBall} style={iconStyle} />
				<FontAwesomeIcon icon={faAnchor} style={iconStyle} />
				<FontAwesomeIcon icon={faFlask} style={iconStyle} />
				<FontAwesomeIcon icon={faSun} style={iconStyle} />
				<FontAwesomeIcon icon={faHandSpock} style={iconStyle} />
				<FontAwesomeIcon icon={faBug} style={iconStyle} />
				<FontAwesomeIcon icon={faMoon} style={iconStyle} />
				<FontAwesomeIcon icon={faSnowflake} style={iconStyle} />
				<FontAwesomeIcon icon={faLiraSign} style={iconStyle} />
				<FontAwesomeIcon icon={faCar} style={iconStyle} />
			</p>
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

// <!-- Game board start -->

// Restart
// New Game

// <!-- Multiplayer scores start -->

// Player 1
// <!-- P1 score -->
// Current Turn

// Player 2
// <!-- P2 score -->
// Current Turn

// Player 3
// <!-- P3 score -->
// Current Turn

// Player 4
// <!-- P4 score -->
// Current Turn

// <!-- Multiplayer scores start -->

// <!-- Solo game time and moves counter start -->

// Time
// <!-- Time elapsed -->

// Moves
// <!-- Moves total -->

// <!-- Solo game time and moves counter end -->

// <!-- Game board end -->
