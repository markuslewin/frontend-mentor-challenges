/**
 * @vitest-environment jsdom
 */
import { render, type Screen, screen, within } from '@testing-library/react'
import { type UserEvent, userEvent } from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import {
	Game,
	GameOver,
	GameOverDescription,
	GameOverOptions,
	GameOverTitle,
} from '#app/components/game'
import { useGame } from '#app/utils/game'
import { type Position } from '#app/utils/table'

vi.mock(import('#app/utils/memory'), async (importOriginal) => {
	return {
		...(await importOriginal()),
		createTiles() {
			return [
				[1, 1, 2, 2],
				[3, 3, 4, 4],
				[5, 5, 6, 6],
				[7, 7, 8, 8],
			]
		},
	} satisfies Awaited<ReturnType<typeof importOriginal>>
})

// Debug tiles
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Tiles() {
	const game = useGame()

	return game.tiles
		.flatMap((r) => r)
		.map((tile, i) => {
			return <p key={i}>{tile}</p>
		})
}

const buttonsTestId = 'buttons'

function getButtons(screen: Screen) {
	return within(screen.getByTestId(buttonsTestId)).getAllByRole('button')
}

async function clickButtons(user: UserEvent, screen: Screen) {
	for (const button of getButtons(screen)) {
		await user.click(button)
	}
}

interface ButtonsProps {
	onClicks: (() => void)[]
}

function Buttons({ onClicks }: ButtonsProps) {
	return (
		<div data-testid={buttonsTestId}>
			{onClicks.map((onClick, i) => {
				return (
					<button key={i} type="button" onClick={onClick}>
						{i}
					</button>
				)
			})}
		</div>
	)
}

const positions: Position[] = []
for (let y = 0; y < 4; ++y) {
	for (let x = 0; x < 4; ++x) {
		positions.push([x, y])
	}
}

test('displays game over dialog', async () => {
	const title = 'Game over'
	const description = 'Game over description'

	const user = userEvent.setup()

	function TestComponent() {
		const game = useGame()

		return (
			<>
				<Buttons onClicks={positions.map((p) => () => game.selectTile(p))} />
			</>
		)
	}
	render(
		<Game theme="numbers" size="4x4">
			<TestComponent />
			<GameOver>
				<GameOverTitle>{title}</GameOverTitle>
				<GameOverDescription>{description}</GameOverDescription>
				<GameOverOptions />
			</GameOver>
		</Game>,
	)

	expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()

	await clickButtons(user, screen)

	expect(screen.getByRole('alertdialog')).toHaveAccessibleName(title)
	expect(screen.getByRole('alertdialog')).toHaveAccessibleDescription(
		description,
	)
})

test('game over dialog calls restart callback', async () => {
	const user = userEvent.setup()

	const onRestart = vi.fn()

	function TestComponent() {
		const game = useGame()

		return (
			<>
				<Buttons onClicks={positions.map((p) => () => game.selectTile(p))} />
			</>
		)
	}
	render(
		<Game theme="numbers" size="4x4" onRestart={onRestart}>
			<TestComponent />
			<GameOver>
				<GameOverTitle>Title</GameOverTitle>
				<GameOverDescription>Description</GameOverDescription>
				<GameOverOptions />
			</GameOver>
		</Game>,
	)

	await clickButtons(user, screen)
	await user.click(
		within(screen.getByRole('alertdialog')).getByRole('button', {
			name: /restart/i,
		}),
	)

	expect(onRestart).toHaveBeenCalledOnce()
	expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
})

test('game over dialog calls new game callback', async () => {
	const user = userEvent.setup()

	const onNewGame = vi.fn()

	function TestComponent() {
		const game = useGame()

		return (
			<>
				<Buttons onClicks={positions.map((p) => () => game.selectTile(p))} />
			</>
		)
	}
	render(
		<Game theme="numbers" size="4x4" onNewGame={onNewGame}>
			<TestComponent />
			<GameOver>
				<GameOverTitle>Title</GameOverTitle>
				<GameOverDescription>Description</GameOverDescription>
				<GameOverOptions />
			</GameOver>
		</Game>,
	)

	await clickButtons(user, screen)
	await user.click(
		within(screen.getByRole('alertdialog')).getByRole('button', {
			name: /new game/i,
		}),
	)

	expect(onNewGame).toHaveBeenCalledOnce()
})
