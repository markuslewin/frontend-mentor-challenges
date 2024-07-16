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
		<main className="isolate">
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
				<Landmark.Root>
					<Landmark.Label>
						<h2>Search result</h2>
					</Landmark.Label>
					<ul role="list">
						{jobs.map((job) => (
							<li key={job.id}>
								<Img alt="" priority src={job.logo} width="88" height="88" />
								<h3>
									<a href="#">{job.position}</a>
								</h3>
								<div>
									<p>{job.company}</p>
									{job.new ? <p>New</p> : null}
									{job.featured ? <p>Featured</p> : null}
								</div>
								<hr />
								<ul role="list">
									<li>{job.postedAt}</li>
									<li>{job.contract}</li>
									<li>{job.location}</li>
								</ul>
								<ul role="list">
									{[job.role, job.level, ...job.languages].map((tag) => (
										<li key={tag}>
											<p>
												<button type="button">{tag}</button>
											</p>
											<p>Add tag to filter</p>
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

export function AppWithProviders() {
	return (
		<AnnouncementProvider>
			<App />
			<Announcer />
		</AnnouncementProvider>
	)
}
