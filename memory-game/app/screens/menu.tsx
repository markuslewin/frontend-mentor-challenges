import { getCollectionProps, getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariant } from '@epic-web/invariant'
import { css, cx } from '@linaria/core'
import {
	assertTheme,
	grids,
	type Options,
	optionsSchema,
	players,
	type Theme,
	themes,
} from '#app/utils/memory'
import { media } from '#app/utils/screens'
import { hocus } from '#app/utils/style'
import { type Writeable } from '#app/utils/type'

function rem(px: number) {
	return `${px / 16}rem`
}

const values = css`
	margin-top: ${rem(16)};
	display: flex;
	gap: var(--values-gap, ${rem(11)});

	& > * {
		flex: 1 0 0;
	}

	@media ${media.tablet} {
		gap: var(--values-gap, ${rem(30)});
	}
`

const value = css`
	display: block;
	border-radius: 9999px;
	padding: ${rem(10)};
	text-align: center;

	input:focus-visible + & {
		outline: ${rem(2)} solid black;
		outline-offset: ${rem(2)};
	}
`

function getThemeName(id: Theme) {
	if (id === 'icons') {
		return 'Icons'
	} else if (id === 'numbers') {
		return 'Numbers'
	} else {
		throw new Error(`Invalid ID: ${id}`)
	}
}

interface MenuProps {
	onStartGame(options: Options): void
}

export function Menu({ onStartGame }: MenuProps) {
	const [form, fields] = useForm({
		constraint: getZodConstraint(optionsSchema),
		defaultValue: {
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		} satisfies Options,
		onSubmit(event, { formData }) {
			event.preventDefault()

			const submission = parseWithZod(formData, { schema: optionsSchema })
			invariant(
				submission.status === 'success',
				`Invalid form submission: ${JSON.stringify(submission.reply())}`,
			)

			onStartGame(submission.value)
		},
	})

	return (
		<main
			className={css`
				min-height: 100vh;
				padding: ${rem(24)};
				display: grid;
				grid-template-columns: minmax(auto, ${rem(654)});
				place-content: center;
			`}
		>
			<h1
				className={cx(
					'text-new-title',
					css`
						text-align: center;
					`,
				)}
			>
				memory
			</h1>
			<form
				{...getFormProps(form)}
				className={cx(
					'bg-FCFCFC text-7191A5',
					css`
						margin-top: ${rem(45)};
						border-radius: ${rem(10)};
						padding: ${rem(24)};
						@media ${media.tablet} {
							margin-top: ${rem(78)};
							border-radius: ${rem(20)};
							padding: ${rem(56)};
						}
					`,
				)}
			>
				<fieldset>
					<legend className="text-new-label">Select Theme</legend>
					<div className={values}>
						{getCollectionProps(fields.theme, {
							type: 'radio',
							options: themes as Writeable<typeof themes>,
							value: true,
						}).map((props) => {
							const { key, ...ps } = props
							assertTheme(props.value)

							return (
								<label key={key}>
									<input {...ps} className="peer sr-only" />
									<span
										className={cx(
											'bg-BCCED9 text-new-value text-FCFCFC transition-colors peer-checked:bg-304859 hocus:bg-6395B8',
											value,
										)}
									>
										{getThemeName(props.value)}
									</span>
								</label>
							)
						})}
					</div>
				</fieldset>
				<fieldset
					className={css`
						margin-top: ${rem(24)};
						@media ${media.tablet} {
							margin-top: ${rem(32)};
						}
					`}
				>
					<legend className="text-new-label">Number of Players</legend>
					<div
						className={cx(
							values,
							css`
								--values-gap: ${rem(10)};
								@media ${media.tablet} {
									--values-gap: ${rem(21)};
								}
							`,
						)}
					>
						{getCollectionProps(fields.players, {
							type: 'radio',
							options: players as Writeable<typeof players>,
							value: true,
						}).map((props) => {
							const { key, ...ps } = props

							return (
								<label key={key}>
									<input {...ps} className="peer sr-only" />
									<span
										className={cx(
											'bg-BCCED9 text-new-value text-FCFCFC transition-colors peer-checked:bg-304859 hocus:bg-6395B8',
											value,
										)}
									>
										{ps.value}
									</span>
								</label>
							)
						})}
					</div>
				</fieldset>
				<fieldset
					className={css`
						margin-top: ${rem(24)};
						@media ${media.tablet} {
							margin-top: ${rem(32)};
						}
					`}
				>
					<legend className="text-new-label">Grid Size</legend>
					<div className={values}>
						{getCollectionProps(fields.grid, {
							type: 'radio',
							options: grids as Writeable<typeof grids>,
							value: true,
						}).map((props) => {
							const { key, ...ps } = props

							return (
								<label key={key}>
									<input {...ps} className="peer sr-only" />
									<span
										className={cx(
											'bg-BCCED9 text-new-value text-FCFCFC transition-colors peer-checked:bg-304859 hocus:bg-6395B8',
											value,
										)}
									>
										{ps.value}
									</span>
								</label>
							)
						})}
					</div>
				</fieldset>
				<button
					className={cx(
						'bg-FDA214 text-new-start text-FCFCFC transition-colors',
						css`
							display: block;
							margin-top: ${rem(32)};
							width: 100%;
							border-radius: 9999px;
							padding: ${rem(13)};
							${hocus} {
								background: hsl(37 100% 65%);
							}
							@media ${media.tablet} {
								padding: ${rem(15)};
							}
						`,
					)}
					type="submit"
				>
					Start Game
				</button>
			</form>
		</main>
	)
}
