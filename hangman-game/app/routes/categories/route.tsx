import { cx } from 'class-variance-authority'
import { Form } from 'react-router-dom'
import { Header } from '#app/components/header'
import { categoryName } from '#app/routes/categories/routing'
import { type Category } from '#app/utils/hangman'
import { blueButton, center } from '#app/utils/styles'

export function Categories() {
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
										className={cx(
											'rounded-[1.25rem] p-6 text-24 tablet:rounded-[2.5rem] tablet:p-[4.125rem] tablet:text-48',
											blueButton,
										)}
										name={categoryName}
										value={category.value}
									>
										{category.text}
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
