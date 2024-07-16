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
		<main>
			<h1>Job listings</h1>
			<Picture>
				<source
					media={media.tablet}
					srcSet="/images/bg-header-desktop.svg"
					width="1440"
					height="156"
				/>
				<Img alt="" src="/images/bg-header-mobile" width="375" height="156" />
			</Picture>
			<Landmark.Root>
				<Landmark.Label>
					<h2>Search filters</h2>
				</Landmark.Label>
				{/* <p>No search filters applied.</p> */}
				<ul role="list">
					{filters.map((filter) => (
						<li key={filter}>
							<p>{filter}</p>
							<p>
								<button type="button">
									<Icon name="icon-remove" />{' '}
									<span>Remove filter "{filter}"</span>
								</button>
							</p>
						</li>
					))}
				</ul>
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
