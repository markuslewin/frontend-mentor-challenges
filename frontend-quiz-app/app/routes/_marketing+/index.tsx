import { subjects } from './subjects/subjects.ts'

export default function Index() {
	return (
		<main>
			<div className="mx-auto box-content max-w-default px-6 tablet:px-16 desktop:grid desktop:grid-cols-2 desktop:gap-16">
				<div>
					<h1 className="text-[2.5rem] font-light leading-none text-foreground-heading tablet:text-heading-l">
						Welcome to the{' '}
						<strong className="mt-2 block font-medium">Frontend Quiz!</strong>
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
					{subjects.map(subject => {
						return (
							<li
								key={subject.name}
								className="mt-3 rounded-xl bg-card text-card-foreground shadow-default shadow-card-shadow first:mt-0 tablet:mt-6 tablet:rounded-3xl tablet:first:mt-0"
							>
								<a
									className="border-3 grid grid-cols-[max-content_1fr] items-center gap-4 rounded-[inherit] border-transparent p-[calc(1.25rem-3px)] tablet:gap-8"
									href={subject.href}
								>
									<div
										className={`${subject.background} grid size-10 place-items-center rounded-md tablet:size-14 tablet:rounded-xl desktop:rounded-lg`}
									>
										<img
											className="h-[1.75rem] tablet:h-[2.5rem]"
											alt=""
											src={subject.src}
										/>
									</div>
									{subject.name}
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</main>
	)
}
