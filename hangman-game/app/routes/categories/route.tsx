import { useMediaQuery } from '@uidotdev/usehooks'
import { cx } from 'class-variance-authority'
import { Squircle } from 'corner-smoothing'
import { Form } from 'react-router-dom'
import { Header } from '#app/components/header'
import { categoryName } from '#app/routes/categories/routing'
import { type Category } from '#app/utils/hangman'
import { media } from '#app/utils/screens'
import { center } from '#app/utils/styles'

export function Categories() {
	const tabletMatches = useMediaQuery(media.tablet)

	return (
		<div className="flex min-h-screen flex-col">
			<div className="min-h-8 grow-[80]" />
			<Header heading="Pick a Category" />
			<div className="min-h-[6.25rem] grow-[155]" />
			<main className={cx(center)}>
				<Form method="post">
					<fieldset>
						<legend className="sr-only">Pick a category</legend>
						<ul
							className="grid gap-4 tablet:grid-cols-2 tablet:gap-8 desktop:grid-cols-3 desktop:gap-y-[3.125rem]"
							role="list"
						>
							{(
								[
									{ text: 'Movies', value: 'Movies' },
									{ text: 'TV Shows', value: 'TV Shows' },
									{ text: 'Countries', value: 'Countries' },
									{ text: 'Capital Cities', value: 'Capital Cities' },
									{ text: 'Animals', value: 'Animals' },
									{ text: 'Sports', value: 'Sports' },
								] satisfies { text: string; value: Category }[]
							).map((category) => (
								<li className="grid" key={category.value}>
									<button
										className="group grid rounded-[1.25rem] tablet:rounded-[2.5rem]"
										name={categoryName}
										value={category.value}
									>
										<Squircle
											className="bg-[hsl(244_76%_23%)] px-[0.1875rem] pb-[0.3125rem] pt-[0.0625rem]"
											as="span"
											cornerRadius={tabletMatches ? 40 : 20}
										>
											<Squircle
												className="block bg-[hsl(223_100%_62%)] px-[0.1875rem] pt-[0.375rem]"
												as="span"
												cornerRadius={tabletMatches ? 37 : 17}
											>
												<Squircle
													className="block bg-blue pb-[1.1875rem] pt-[1.0625rem] text-24 text-white transition-colors group-hocus:bg-[hsl(223,100%,68%)] tablet:pb-[3.8125rem] tablet:pt-[3.6875rem] tablet:text-48"
													as="span"
													cornerRadius={tabletMatches ? 34 : 14}
												>
													{category.text}
												</Squircle>
											</Squircle>
										</Squircle>
									</button>
								</li>
							))}
						</ul>
					</fieldset>
				</Form>
			</main>
			<div className="min-h-20 grow-[196]" />
		</div>
	)
}
