import { cx } from 'class-variance-authority'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useId, useState } from 'react'
import {
	AnnouncementProvider,
	Announcer,
	useAnnouncer,
} from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { Img, Picture } from '#app/components/picture'
import jobs from '#app/data/jobs.json'
import { media } from '#app/utils/screens'

function useFilters() {
	const [filters, setFilters] = useState<string[]>([])

	return {
		values: filters,
		add(filter: string) {
			setFilters([...new Set([...filters, filter])])
		},
		remove(filter: string) {
			setFilters(filters.filter((f) => f !== filter))
		},
		clear() {
			setFilters([])
		},
	}
}

function App() {
	const filters = useFilters()
	const { announce } = useAnnouncer()

	const filteredJobs = jobs.filter((job) =>
		filters.values.every((filter) => getTags(job).includes(filter)),
	)

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
				<Landmark.Root>
					<Landmark.Label>
						<h2 className="sr-only">Search filters</h2>
					</Landmark.Label>
					<AnimatePresence initial={false} mode="popLayout">
						{filters.values.length <= 0 ? (
							<p className="sr-only">No search filters applied.</p>
						) : (
							<motion.div
								className="grid grid-cols-[1fr_auto] items-center gap-10 rounded border-[transparent] bg-white text-light-grey shadow shape-p-5 shape-border tablet:px-10"
								key="filters"
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
								}}
								exit={{
									opacity: 0,
								}}
							>
								<ul className="flex flex-wrap gap-4" role="list">
									{filters.values.map((filter) => (
										<li
											className="grid h-8 grid-cols-[max-content_max-content] text-tag"
											key={filter}
										>
											<p className="grid items-center rounded-s border-[transparent] bg-green/10 text-green shape-px-2 shape-border">
												<span className="translate-y-[0.125rem]">{filter}</span>
											</p>
											<form
												className="grid"
												onSubmit={(e) => {
													e.preventDefault()
													filters.remove(filter)
													announce(`Removed tag "${filter}" from filter.`)
												}}
											>
												<button className="grid w-8 place-items-center rounded-e border border-[transparent] bg-green text-white transition-colors hocus:bg-grey">
													<Icon
														className="size-[0.875rem]"
														name="icon-remove"
													/>{' '}
													<span className="sr-only">
														Remove filter "{filter}"
													</span>
												</button>
											</form>
										</li>
									))}
								</ul>
								<form
									onSubmit={(e) => {
										e.preventDefault()
										filters.clear()
										announce(`Cleared ${filters.values.length} tags.`)
									}}
								>
									<button className="text-tag transition-colors hocus:text-green hocus:underline">
										Clear
									</button>
								</form>
							</motion.div>
						)}
					</AnimatePresence>
				</Landmark.Root>
				<Landmark.Root
					className={cx(
						filters.values.length <= 0
							? 'mt-[5.75rem] tablet:mt-28'
							: 'mt-14 tablet:mt-10',
					)}
				>
					<Landmark.Label>
						<h2 className="sr-only">Search result</h2>
					</Landmark.Label>
					<ul className="grid gap-10 tablet:gap-6" role="list">
						<MotionConfig reducedMotion="user">
							<AnimatePresence initial={false} mode="popLayout">
								{filteredJobs.map((job) => (
									<motion.li
										className={cx(
											'shape-pt-0 rounded border-[transparent] bg-white bg-origin-border shadow shape-p-6 shape-border tablet:grid tablet:grid-cols-[max-content_1fr] tablet:items-center tablet:gap-4 tablet:shape-px-10 tablet:shape-py-8',
											job.featured
												? 'bg-gradient-to-r from-green from-[0.3125rem] to-white to-[0.3125rem]'
												: '',
										)}
										key={job.id}
										data-testid="job"
										layout
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										exit={{ scale: 0.8, opacity: 0 }}
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
													<p className="text-company text-green">
														{job.company}
													</p>
													<ul className="flex flex-wrap gap-2" role="list">
														{job.new ? (
															<li className="grid h-6 items-center whitespace-nowrap rounded-full border-[transparent] bg-green text-meta uppercase text-white shape-px-2 shape-border">
																New!
															</li>
														) : null}
														{job.featured ? (
															<li className="grid h-6 items-center whitespace-nowrap rounded-full border-[transparent] bg-grey text-meta uppercase text-white shape-px-2 shape-border">
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
											{getTags(job).map((tag) => (
												<Tag
													key={tag}
													name={tag}
													onSelect={() => {
														filters.add(tag)
														announce(`Added tag "${tag}" to filter.`)
													}}
												/>
											))}
										</ul>
									</motion.li>
								))}
							</AnimatePresence>
						</MotionConfig>
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

interface TagProps {
	name: string
	onSelect(): void
}

function Tag({ name, onSelect }: TagProps) {
	const descriptionId = useId()

	return (
		<li key={name}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					onSelect()
				}}
			>
				<button
					className="h-8 rounded-sm border-[transparent] bg-green/10 text-tag text-green transition-colors shape-px-2 shape-border hocus:bg-green hocus:text-white"
					aria-describedby={descriptionId}
				>
					{name}
				</button>
			</form>
			<p className="sr-only" id={descriptionId}>
				Add tag "{name}" to filter
			</p>
		</li>
	)
}

type Job = (typeof jobs)[number]

function getTags(job: Job) {
	return [job.role, job.level, ...job.languages]
}

export function AppWithProviders() {
	return (
		<AnnouncementProvider>
			<App />
			<Announcer />
		</AnnouncementProvider>
	)
}
