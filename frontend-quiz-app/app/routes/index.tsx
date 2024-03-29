import { Link } from '@remix-run/react'
import { ThemeSwitch } from '../components/theme-switcher.tsx'
import { useAnnouncer } from '../utils/announcer.tsx'
import { subjects } from '../utils/subjects/subjects.tsx'

export default function Index() {
	const { announce } = useAnnouncer()

	return (
		<>
			<header className="py-[1.625rem] tablet:py-[3.375rem] desktop:py-[6.0625rem]">
				<div className="mx-auto box-content flex max-w-default justify-end px-6 tablet:px-16">
					<ThemeSwitch />
				</div>
			</header>
			<div className="mt-8 flex-1 tablet:mt-2 desktop:mt-1">
				<main>
					<div className="mx-auto box-content max-w-default px-6 tablet:px-16 desktop:grid desktop:grid-cols-main-desktop desktop:justify-between desktop:gap-16">
						<div>
							<h1 className="text-[2.5rem] font-light leading-none text-foreground-heading tablet:text-heading-l">
								Welcome to the{' '}
								<strong className="mt-2 block font-medium">
									Frontend Quiz!
								</strong>
							</h1>
							<p className="mt-4 italic desktop:mt-12">
								Pick a subject to get started.
							</p>
						</div>
						{/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
						<ul
							className="mt-10 text-[1.125rem] font-medium leading-none tablet:mt-16 tablet:text-heading-s desktop:mt-0"
							role="list"
						>
							{[
								subjects.html,
								subjects.css,
								subjects.javascript,
								subjects.accessibility,
							].map((subject, i) => {
								return (
									<li
										key={i}
										className="mt-3 rounded-xl bg-card text-card-foreground shadow-default shadow-card-shadow first:mt-0 tablet:mt-6 tablet:rounded-3xl tablet:first:mt-0"
									>
										<Link
											className="block rounded-[inherit] border-transparent shape-p-3 shape-border-3 desktop:shape-p-5"
											to={subject.href}
											onClick={() => {
												announce('Loading...')
											}}
										>
											<div className="grid grid-cols-[max-content_1fr] items-center gap-4 tablet:gap-8">
												<div
													className={`${subject.color} grid size-10 place-items-center rounded-md border-1 border-transparent tablet:size-14 tablet:rounded-xl desktop:rounded-lg`}
												>
													<img
														className="h-[1.75rem] tablet:h-[2.5rem]"
														alt=""
														src={subject.src}
													/>
												</div>
												<p>{subject.name}</p>
											</div>
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
				</main>
			</div>
		</>
	)
}
