import { cx } from 'class-variance-authority'
import { useState } from 'react'
import { AnnouncementProvider, Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon.js'
import * as Landmark from '#app/components/landmark'
import { Img, Picture } from '#app/components/picture'
import jobs from '#app/data/jobs.json'
import { media } from '#app/utils/screens'

function useFilters() {
	const [filters, setFilters] = useState<string[]>([
		'Frontend',
		'CSS',
		'JavaScript',
	])

	return { filters }
}

function App() {
	const { filters } = useFilters()

	return (
		<main className="isolate min-h-screen pb-9 tablet:pb-[7.5rem]">
			<h1 className="sr-only">Job listings</h1>
			<Picture>
				<source
					media={media.tablet}
					srcSet="/images/bg-header-desktop.svg"
					width="1440"
					height="156"
				/>
				<Img
					className="relative -z-10 -mb-9 h-[9.75rem] w-full bg-green object-cover"
					alt=""
					src="/images/bg-header-mobile.svg"
					width="375"
					height="156"
				/>
			</Picture>
			<div className="center-[69.375rem] center-gutter-6 tablet:center-gutter-10">
				<Landmark.Root className="grid grid-cols-[1fr_auto] items-center gap-10 rounded bg-white p-5 text-light-grey shadow tablet:px-10">
					<Landmark.Label>
						<h2 className="sr-only">Search filters</h2>
					</Landmark.Label>
					{/* <p>No search filters applied.</p> */}
					<ul className="flex flex-wrap gap-4" role="list">
						{filters.map((filter) => (
							<li
								className="grid h-8 grid-cols-[max-content_max-content] text-tag"
								key={filter}
							>
								<p className="grid items-center rounded-s bg-green/10 px-2 text-green">
									<span className="translate-y-[0.125rem]">{filter}</span>
								</p>
								<p className="grid">
									<button
										className="grid w-8 place-items-center rounded-e bg-green text-white transition-colors hocus:bg-grey"
										type="button"
									>
										<Icon className="size-[0.875rem]" name="icon-remove" />{' '}
										<span className="sr-only">Remove filter "{filter}"</span>
									</button>
								</p>
							</li>
						))}
					</ul>
					<p>
						<button
							className="text-tag transition-colors hocus:text-green hocus:underline"
							type="button"
						>
							Clear
						</button>
					</p>
				</Landmark.Root>
				<Landmark.Root className="mt-14 tablet:mt-10">
					<Landmark.Label>
						<h2 className="sr-only">Search result</h2>
					</Landmark.Label>
					<ul className="grid gap-10 tablet:gap-6" role="list">
						{jobs.map((job) => (
							<li
								className={cx(
									'rounded bg-white p-6 pt-0 shadow tablet:grid tablet:grid-cols-[max-content_1fr] tablet:items-center tablet:gap-4 tablet:px-10 tablet:py-8',
									job.featured
										? 'bg-gradient-to-r from-green from-[0.3125rem] to-white to-[0.3125rem]'
										: '',
								)}
								key={job.id}
							>
								<div className="flex flex-col gap-2 tablet:flex-row tablet:gap-6">
									<Img
										className="-mt-6 size-12 tablet:mt-0 tablet:size-[5.5rem]"
										alt=""
										priority
										src={job.logo}
										width="88"
										height="88"
									/>
									<div className="grid">
										<h3 className="mt-2 tablet:mt-[0.625rem]">
											<a
												className="text-position text-grey transition-colors hocus:text-green"
												href="#"
											>
												{job.position}
											</a>
										</h3>
										<div className="row-start-1 flex flex-wrap items-center gap-x-7 gap-y-4 tablet:gap-4">
											<p className="text-company text-green">{job.company}</p>
											<ul className="flex flex-wrap gap-2" role="list">
												{job.new ? (
													<li className="grid h-6 items-center whitespace-nowrap rounded-full bg-green px-2 text-meta uppercase text-white">
														New!
													</li>
												) : null}
												{job.featured ? (
													<li className="grid h-6 items-center whitespace-nowrap rounded-full bg-grey px-2 text-meta uppercase text-white">
														Featured
													</li>
												) : null}
											</ul>
										</div>
										<ul
											className="flex flex-wrap items-center gap-[0.625rem]"
											role="list"
										>
											<li>{job.postedAt}</li>
											<li className="flex flex-wrap items-center gap-[0.625rem]">
												<Dot />
												{job.contract}
											</li>
											<li className="flex flex-wrap items-center gap-[0.625rem]">
												<Dot />
												{job.location}
											</li>
										</ul>
									</div>
								</div>
								<hr className="mt-4 text-lighter-grey tablet:hidden" />
								<ul
									className="mt-4 flex flex-wrap gap-4 tablet:mt-0 tablet:justify-end"
									role="list"
								>
									{[job.role, job.level, ...job.languages].map((tag) => (
										<li key={tag}>
											<p>
												<button
													className="h-8 rounded-sm bg-green/10 px-2 text-tag text-green transition-colors hocus:bg-green hocus:text-white"
													type="button"
												>
													{tag}
												</button>
											</p>
											<p className="sr-only">Add tag to filter</p>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</Landmark.Root>
			</div>
		</main>
	)
}

function Dot() {
	return (
		<span className="block size-1 rounded-full border-t-[0.25rem] border-lighter-grey" />
	)
}

export function AppWithProviders() {
	return (
		<AnnouncementProvider>
			<App />
			<Announcer />
		</AnnouncementProvider>
	)
}
