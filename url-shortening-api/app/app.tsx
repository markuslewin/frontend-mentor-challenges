import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useMediaQuery } from '@uidotdev/usehooks'
import { cx } from 'class-variance-authority'
import { useId, useRef, useState } from 'react'
import { useAnnouncer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { Img, Picture, Source } from '#app/components/picture'
import { useLinks } from '#app/utils/links'
import { media } from '#app/utils/screens'
import { shortenRequestSchema } from '#app/utils/shortener'
import { nbsp } from '#app/utils/unicode'

const center = 'center-[33.75rem] tablet:center-[69.375rem]'

export function App() {
	const linksLabelId = useId()
	const formRef = useRef<HTMLFormElement>(null)
	const tabletMatches = useMediaQuery(media.tablet)
	const { announce } = useAnnouncer()
	const links = useLinks()
	const [form, fields] = useForm({
		constraint: getZodConstraint(shortenRequestSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: shortenRequestSchema })
		},
		onSubmit(event) {
			event.preventDefault()
			if (!links.create.isPending) {
				announce('Shortening link')
				links.create.mutate(new FormData(event.currentTarget), {
					onSuccess: () => {
						announce('Link shortened')
						formRef.current?.reset()
					},
				})
			}
		},
	})

	return (
		<>
			<div className={cx('overflow-hidden pb-40 tablet:pb-[9.5rem]', center)}>
				<div className="grid gap-9 tablet:grid-cols-[635fr_445fr] tablet:gap-[1.875rem]">
					<div className="tablet:order-1 tablet:self-center">
						<Img
							className="h-auto w-[152%] max-w-none tablet:w-[165%]"
							alt=""
							src="/images/illustration-working.svg"
							width="733"
							height="482"
							priority
						/>
					</div>
					<div className="grid max-w-[35.625rem] text-center tablet:grid-rows-[61fr_auto_70fr] tablet:text-start">
						<div className="tablet:row-start-2">
							<h1 className="text-h1 text-very-dark-blue">
								More than just shorter links
							</h1>
							<p className="mt-4 max-w-[33.75rem] text-body-1 tablet:mt-1">
								Build your brand’s recognition and get detailed insights on how
								your links are performing.
							</p>
							<p className="mt-8 tablet:mt-10">
								<GetStartedButton />
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-whiteish">
				<Landmark.Root className={cx('', center)}>
					<Landmark.Label>
						<h2 className="sr-only">Shorten links</h2>
					</Landmark.Label>
					<div className="relative isolate -mt-20 overflow-hidden rounded bg-dark-violet text-white shape-p-6 tablet:-mt-[5.25rem] tablet:shape-py-[3.25rem] tablet:shape-px-16 tablet:shape-pb-[1.625rem]">
						<Picture>
							<Source
								media={media.tablet}
								srcSet="/images/bg-shorten-desktop.svg"
								width="1110"
								height="168"
							/>
							<Img
								className="absolute inset-0 -z-10 size-full object-cover"
								alt=""
								src="/images/bg-shorten-mobile.svg"
								width="237"
								height="128"
							/>
						</Picture>
						<form
							{...getFormProps(form)}
							className="grid gap-4 tablet:grid-cols-[1fr_max-content] tablet:gap-6"
							ref={formRef}
						>
							<div>
								<label className="sr-only" htmlFor={fields.link.id}>
									Link:
								</label>
								<input
									{...getInputProps(fields.link, { type: 'url' })}
									className="h-12 w-full rounded bg-white text-input text-very-dark-blue transition-all shape-py-[0.375rem] shape-px-4 shape-border-[0.1875rem] placeholder:text-very-dark-blue/50 disabled:opacity-50 aria-invalid:border-red aria-invalid:placeholder:text-red/50 tablet:h-16 tablet:shape-py-[0.875rem] tablet:shape-px-8"
									placeholder="Shorten a link here..."
									disabled={links.create.isPending}
								/>
								<div className="mt-1 text-error italic text-red tablet:mt-2">
									<p id={fields.link.errorId}>
										{fields.link.errors ?? (tabletMatches ? nbsp : null)}
									</p>
									<p id={form.errorId}>{form.errors}</p>
								</div>
							</div>
							<button
								className="inline-grid h-12 items-center whitespace-nowrap rounded bg-cyan text-button text-white transition-all shape-px-10 disabled:opacity-50 hocus:bg-light-cyan tablet:h-16"
								disabled={links.create.isPending}
							>
								{links.create.isPending ? 'Shortening...' : 'Shorten It!'}
							</button>
						</form>
					</div>
					<h3 className="sr-only" id={linksLabelId}>
						Shortened links
					</h3>
					<ul
						className="mt-6 grid gap-6 empty:mt-0 tablet:gap-4"
						role="list"
						aria-labelledby={linksLabelId}
					>
						{links.data.map((link) => (
							<li
								className="grid rounded-sm border border-[transparent] bg-white text-very-dark-blue tablet:grid-cols-[1fr_auto] tablet:items-center tablet:gap-6 tablet:shape-py-4 tablet:shape-pr-6 tablet:shape-pl-8"
								key={link.id}
							>
								<h4 className="px-4 py-2 text-input tablet:p-0">{link.long}</h4>
								<div className="border-t-[0.0625rem] border-grayish-violet/25 tablet:hidden" />
								<div className="grid gap-3 px-4 pb-4 pt-2 tablet:grid tablet:grid-cols-[auto_6.4375rem] tablet:items-center tablet:gap-6 tablet:p-0">
									<p className="text-input text-cyan tablet:text-end">
										{/* <a href={link.short}>{link.short}</a> */}
										<a href="#">{link.short}</a>
									</p>
									<Copy text={link.short} />
								</div>
							</li>
						))}
					</ul>
				</Landmark.Root>
				<div className={cx('', center)}>
					<div>
						<div className="mx-auto max-w-[33.75rem] text-center">
							<h2 className="mt-20 text-h2 text-very-dark-blue tablet:mt-[7.5rem]">
								Advanced Statistics
							</h2>
							<p className="mt-4 text-body-2 tablet:mt-[1.125rem]">
								Track how your links are performing across the web with our
								advanced statistics dashboard.
							</p>
						</div>
						<div className="relative isolate mt-[5.75rem] grid gap-[5.75rem] text-center tablet:mt-[6.25rem] tablet:grid-cols-3 tablet:grid-rows-[2.75rem_2.75rem_auto_2.75rem_2.75rem] tablet:gap-x-[1.875rem] tablet:gap-y-0 tablet:text-start">
							<div className="absolute inset-y-0 -z-10 justify-self-center border-s-[0.5rem] text-cyan tablet:inset-x-0 tablet:inset-y-auto tablet:-translate-y-[1.375rem] tablet:self-center tablet:justify-self-auto tablet:border-s-0 tablet:border-t-[0.5rem]" />
							<div className="rounded-sm bg-white text-grayish-violet shape-px-8 shape-pb-10 tablet:col-start-1 tablet:row-span-3">
								<div className="mx-auto -mt-[2.75rem] grid size-[5.5rem] place-items-center rounded-full border border-[transparent] bg-dark-violet text-cyan tablet:mx-0">
									<Icon className="size-10" name="icon-brand-recognition" />
								</div>
								<h3 className="mt-8 text-h3 text-very-dark-blue">
									Brand Recognition
								</h3>
								<p className="mt-3">
									Boost your brand recognition with each click. Generic links
									don’t mean a thing. Branded links help instil confidence in
									your content.
								</p>
							</div>
							<div className="rounded-sm bg-white text-grayish-violet shape-px-8 shape-pb-10 tablet:col-start-2 tablet:row-span-3 tablet:row-start-2">
								<div className="mx-auto -mt-[2.75rem] grid size-[5.5rem] place-items-center rounded-full border border-[transparent] bg-dark-violet text-cyan tablet:mx-0">
									<Icon className="size-10" name="icon-detailed-records" />
								</div>
								<h3 className="mt-8 text-h3 text-very-dark-blue">
									Detailed Records
								</h3>
								<p className="mt-3">
									Gain insights into who is clicking your links. Knowing when
									and where people engage with your content helps inform better
									decisions.
								</p>
							</div>
							<div className="rounded-sm bg-white text-grayish-violet shape-px-8 shape-pb-10 tablet:col-start-3 tablet:row-span-3 tablet:row-start-3">
								<div className="mx-auto -mt-[2.75rem] grid size-[5.5rem] place-items-center rounded-full border border-[transparent] bg-dark-violet text-cyan tablet:mx-0">
									<Icon className="size-12" name="icon-fully-customizable" />
								</div>
								<h3 className="mt-8 text-h3 text-very-dark-blue">
									Fully Customizable
								</h3>
								<p className="mt-3">
									Improve brand awareness and content discoverability through
									customizable links, supercharging audience engagement.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="relative isolate mt-20 bg-dark-violet py-24 text-center text-white tablet:mt-[7.5rem] tablet:py-14">
					<Picture>
						<Source
							media={media.tablet}
							srcSet="/images/bg-boost-desktop.svg"
							width="1440"
							height="250"
						/>
						<Img
							className="absolute inset-0 -z-10 size-full object-cover"
							alt=""
							src="/images/bg-boost-mobile.svg"
							width="375"
							height="300"
						/>
					</Picture>
					<div className={cx('', center)}>
						<div>
							<h2 className="text-h2">Boost your links today</h2>
							<p className="mt-4 tablet:mt-8">
								<GetStartedButton />
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

function GetStartedButton() {
	return (
		<a
			className="inline-grid h-14 items-center whitespace-nowrap rounded-full bg-cyan text-button text-white transition-colors shape-px-10 hocus:bg-light-cyan"
			href="#"
		>
			Get Started
		</a>
	)
}

type TimeoutId = ReturnType<typeof setTimeout>

interface CopyProps {
	text: string
}

function Copy({ text }: CopyProps) {
	const { announce } = useAnnouncer()
	const [isCopied, setIsCopied] = useState(false)
	const timeoutIdRef = useRef<TimeoutId>()

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await window.navigator.clipboard.writeText(text)
				setIsCopied(true)
				if (timeoutIdRef.current !== undefined) {
					clearTimeout(timeoutIdRef.current)
				}
				timeoutIdRef.current = setTimeout(() => {
					setIsCopied(false)
					timeoutIdRef.current = undefined
				}, 3000)
				announce('Copied link!')
			}}
		>
			<button
				className={cx(
					'inline-grid h-10 w-full items-center whitespace-nowrap rounded-sm border border-[transparent] text-[1rem] font-bold text-white transition-colors tablet:text-nav-3',
					isCopied ? 'bg-dark-violet' : 'bg-cyan hocus:bg-light-cyan',
				)}
			>
				{isCopied ? 'Copied!' : 'Copy'}
			</button>
		</form>
	)
}
