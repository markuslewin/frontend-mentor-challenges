import { invariant } from '@epic-web/invariant'
import * as Tabs from '@radix-ui/react-tabs'
import { useMediaQuery } from '@uidotdev/usehooks'
import { cx } from 'class-variance-authority'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// @ts-expect-error Search params
import beefDesktopTablet from '#app/assets/homepage/beef-desktop-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import beefDesktopTablet2x from '#app/assets/homepage/beef-desktop-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import beefMobile from '#app/assets/homepage/beef-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import beefMobile2x from '#app/assets/homepage/beef-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import chocolateDesktopTablet from '#app/assets/homepage/chocolate-desktop-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import chocolateDesktopTablet2x from '#app/assets/homepage/chocolate-desktop-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import chocolateMobile from '#app/assets/homepage/chocolate-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import chocolateMobile2x from '#app/assets/homepage/chocolate-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import enjoyablePlaceDesktop from '#app/assets/homepage/enjoyable-place-desktop.jpg?as=metadata'
// @ts-expect-error Search params
import enjoyablePlaceDesktop2x from '#app/assets/homepage/enjoyable-place-desktop@2x.jpg?as=metadata'
// @ts-expect-error Search params
import enjoyablePlaceMobile from '#app/assets/homepage/enjoyable-place-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import enjoyablePlaceMobile2x from '#app/assets/homepage/enjoyable-place-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import enjoyablePlaceTablet from '#app/assets/homepage/enjoyable-place-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import enjoyablePlaceTablet2x from '#app/assets/homepage/enjoyable-place-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import familyGatheringDesktop from '#app/assets/homepage/family-gathering-desktop.jpg?as=metadata'
// @ts-expect-error Search params
import familyGatheringDesktop2x from '#app/assets/homepage/family-gathering-desktop@2x.jpg?as=metadata'
// @ts-expect-error Search params
import familyGatheringMobile from '#app/assets/homepage/family-gathering-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import familyGatheringMobile2x from '#app/assets/homepage/family-gathering-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import familyGatheringTablet from '#app/assets/homepage/family-gathering-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import familyGatheringTablet2x from '#app/assets/homepage/family-gathering-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgDesktop from '#app/assets/homepage/hero-bg-desktop.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgDesktop2x from '#app/assets/homepage/hero-bg-desktop@2x.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgMobile from '#app/assets/homepage/hero-bg-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgMobile2x from '#app/assets/homepage/hero-bg-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgTablet from '#app/assets/homepage/hero-bg-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgTablet2x from '#app/assets/homepage/hero-bg-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import locallySourcedDesktop from '#app/assets/homepage/locally-sourced-desktop.jpg?as=metadata'
// @ts-expect-error Search params
import locallySourcedDesktop2x from '#app/assets/homepage/locally-sourced-desktop@2x.jpg?as=metadata'
// @ts-expect-error Search params
import locallySourcedMobile from '#app/assets/homepage/locally-sourced-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import locallySourcedMobile2x from '#app/assets/homepage/locally-sourced-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import locallySourcedTablet from '#app/assets/homepage/locally-sourced-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import locallySourcedTablet2x from '#app/assets/homepage/locally-sourced-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import readyBgDesktop from '#app/assets/homepage/ready-bg-desktop.jpg?as=metadata'
// @ts-expect-error Search params
import readyBgDesktop2x from '#app/assets/homepage/ready-bg-desktop@2x.jpg?as=metadata'
// @ts-expect-error Search params
import readyBgMobile from '#app/assets/homepage/ready-bg-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import readyBgMobile2x from '#app/assets/homepage/ready-bg-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import readyBgTablet from '#app/assets/homepage/ready-bg-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import readyBgTablet2x from '#app/assets/homepage/ready-bg-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import salmonDesktopTablet from '#app/assets/homepage/salmon-desktop-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import salmonDesktopTablet2x from '#app/assets/homepage/salmon-desktop-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import salmonMobile from '#app/assets/homepage/salmon-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import salmonMobile2x from '#app/assets/homepage/salmon-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import socialEventsDesktop from '#app/assets/homepage/social-events-desktop.jpg?as=metadata'
// @ts-expect-error Search params
import socialEventsDesktop2x from '#app/assets/homepage/social-events-desktop@2x.jpg?as=metadata'
// @ts-expect-error Search params
import socialEventsMobile from '#app/assets/homepage/social-events-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import socialEventsMobile2x from '#app/assets/homepage/social-events-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import socialEventsTablet from '#app/assets/homepage/social-events-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import socialEventsTablet2x from '#app/assets/homepage/social-events-tablet@2x.jpg?as=metadata'
// @ts-expect-error Search params
import specialEventsDesktop from '#app/assets/homepage/special-events-desktop.jpg?as=metadata'
// @ts-expect-error Search params
import specialEventsDesktop2x from '#app/assets/homepage/special-events-desktop@2x.jpg?as=metadata'
// @ts-expect-error Search params
import specialEventsMobile from '#app/assets/homepage/special-events-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import specialEventsMobile2x from '#app/assets/homepage/special-events-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import specialEventsTablet from '#app/assets/homepage/special-events-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import specialEventsTablet2x from '#app/assets/homepage/special-events-tablet@2x.jpg?as=metadata'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import {
	Picture,
	DensityImage,
	DensitySource,
	type Image,
} from '#app/components/picture'
import * as Button from '#app/components/ui/button'
import { Logo } from '#app/components/ui/logo'
import { CurveTopRight, CurveTopLeft, Lines } from '#app/components/ui/patterns'
import { center, outerCenter } from '#app/utils/layout'
import { screens } from '#app/utils/screens'

type Event = 'family' | 'special' | 'social'

function assertValidEvent(value: string): asserts value is Event {
	invariant(
		value === 'family' || value === 'special' || value === 'social',
		'Invalid event',
	)
}

function getEventImages(event: Event) {
	if (event === 'family') {
		return {
			desktop: {
				density1: familyGatheringDesktop,
				density2: familyGatheringDesktop2x,
			},
			tablet: {
				density1: familyGatheringTablet,
				density2: familyGatheringTablet2x,
			},
			mobile: {
				density1: familyGatheringMobile,
				density2: familyGatheringMobile2x,
			},
		}
	} else if (event === 'social') {
		return {
			desktop: {
				density1: socialEventsDesktop,
				density2: socialEventsDesktop2x,
			},
			tablet: {
				density1: socialEventsTablet,
				density2: socialEventsTablet2x,
			},
			mobile: {
				density1: socialEventsMobile,
				density2: socialEventsMobile2x,
			},
		}
	} else if (event === 'special') {
		return {
			desktop: {
				density1: specialEventsDesktop,
				density2: specialEventsDesktop2x,
			},
			tablet: {
				density1: specialEventsTablet,
				density2: specialEventsTablet2x,
			},
			mobile: {
				density1: specialEventsMobile,
				density2: specialEventsMobile2x,
			},
		}
	}
	throw new Error(`Invalid event "${event}"`)
}

export function Home() {
	const [selectedEvent, setSelectedEvent] = useState<Event>('family')
	const tabletMatches = useMediaQuery(`(min-width: ${screens.tablet})`)
	const desktopMatches = useMediaQuery(`(min-width: ${screens.desktop})`)

	const eventImages = getEventImages(selectedEvent)

	return (
		<main>
			<div className="relative isolate bg-cod-gray text-white">
				<Picture>
					<DensitySource
						media={`(min-width: ${screens.desktop})`}
						images={[
							{ density: '1x', image: heroBgDesktop },
							{ density: '2x', image: heroBgDesktop2x },
						]}
					/>
					<DensitySource
						media={`(min-width: ${screens.tablet})`}
						images={[
							{ density: '1x', image: heroBgTablet },
							{ density: '2x', image: heroBgTablet2x },
						]}
					/>
					<DensityImage
						className="absolute inset-0 -z-10 size-full object-cover object-top desktop:object-right"
						alt=""
						priority
						images={[
							{ density: '1x', image: heroBgMobile },
							{ density: '2x', image: heroBgMobile2x },
						]}
					/>
				</Picture>
				<div className="aspect-[400/200] tablet:aspect-[700/280] desktop:hidden" />
				<div
					className={cx(
						'mt-8 pb-40 text-center tablet:mt-16 tablet:pb-56 desktop:mt-0 desktop:pb-[12.5rem] desktop:pt-16 desktop:text-start',
						center,
					)}
				>
					<div className="desktop:max-w-[33.75rem]">
						<Landmark.Root className="flex justify-center desktop:block">
							<Landmark.Label>
								<h2 className="sr-only">Banner</h2>
							</Landmark.Label>
							<Link to="/">
								<Logo />
							</Link>
						</Landmark.Root>
						<h1 className="mt-9 text-heading-xl tablet:mt-10 desktop:mt-[9.5rem]">
							Exquisite dining since 1989
						</h1>
						<p className="mt-5 desktop:mt-3">
							Experience our seasonal menu in beautiful country surroundings.
							Eat the freshest produce from the comfort of our farmhouse.
						</p>
						<p className="mt-14 desktop:mt-10">
							<BookingButton variant="onDark" />
						</p>
					</div>
				</div>
			</div>
			<div className="relative isolate">
				<div className="absolute inset-0 -z-10 hidden overflow-hidden tablet:grid tablet:grid-rows-[100fr_auto_159fr] tablet:justify-center desktop:grid-rows-[250fr_auto_80fr]">
					<CurveTopRight className="row-start-2 tablet:-translate-x-[28rem] desktop:-translate-x-[16rem]" />
				</div>
				<div className={cx('text-center desktop:text-start', center)}>
					<div className="desktop:grid desktop:grid-cols-[540fr_125fr_445fr]">
						<Picture>
							<DensitySource
								media={`(min-width: ${screens.desktop})`}
								images={[
									{ density: '1x', image: enjoyablePlaceDesktop },
									{ density: '2x', image: enjoyablePlaceDesktop2x },
								]}
							/>
							<DensitySource
								media={`(min-width: ${screens.tablet})`}
								images={[
									{ density: '1x', image: enjoyablePlaceTablet },
									{ density: '2x', image: enjoyablePlaceTablet2x },
								]}
							/>
							<DensityImage
								className="relative mx-auto -mt-16 shadow tablet:-mt-24 desktop:-mt-[4.375rem] desktop:w-full"
								alt=""
								images={[
									{ density: '1x', image: enjoyablePlaceMobile },
									{ density: '2x', image: enjoyablePlaceMobile2x },
								]}
							/>
						</Picture>
						<div className="mx-auto mt-12 max-w-[28.375rem] tablet:mt-14 desktop:col-start-3 desktop:mx-0 desktop:mt-0 desktop:grid desktop:max-w-none desktop:grid-rows-[177fr_auto_198fr]">
							<div className="row-start-2">
								<div className="flex justify-center desktop:justify-start">
									<Divide />
								</div>
								<h2 className="mt-9 text-heading-l tablet:mt-10 desktop:mt-14">
									Enjoyable place for all the family
								</h2>
								<p className="mt-3 tablet:mt-7">
									Our relaxed surroundings make dining with us a great
									experience for everyone. We can even arrange a tour of the
									farm before your meal.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative isolate mt-24 pb-24 text-center tablet:mt-28 tablet:pb-32 desktop:mt-[7.5rem] desktop:pb-0 desktop:text-start">
				<div className="absolute inset-0 -z-10 hidden overflow-hidden tablet:grid tablet:items-end tablet:justify-center">
					<CurveTopLeft className="translate-x-1/2 desktop:translate-x-[17rem]" />
				</div>
				<div className={cx('', center)}>
					<div className="grid-cols-[445fr_125fr_540fr] desktop:grid">
						<Picture className="desktop:col-start-3">
							<DensitySource
								media={`(min-width: ${screens.desktop})`}
								images={[
									{ density: '1x', image: locallySourcedDesktop },
									{ density: '2x', image: locallySourcedDesktop2x },
								]}
							/>
							<DensitySource
								media={`(min-width: ${screens.tablet})`}
								images={[
									{ density: '1x', image: locallySourcedTablet },
									{ density: '2x', image: locallySourcedTablet2x },
								]}
							/>
							<DensityImage
								className="mx-auto shadow desktop:-mb-20 desktop:w-full desktop:shadow-[transparent]"
								alt=""
								images={[
									{ density: '1x', image: locallySourcedMobile },
									{ density: '2x', image: locallySourcedMobile2x },
								]}
							/>
						</Picture>
						{/* <Lines /> */}
						<div className="mx-auto mt-12 max-w-[28.375rem] tablet:mt-14 desktop:col-start-1 desktop:row-start-1 desktop:mx-0 desktop:mt-0 desktop:grid desktop:max-w-none desktop:grid-rows-[200fr_auto_165fr]">
							<div className="row-start-2">
								<div className="flex justify-center desktop:justify-start">
									<Divide />
								</div>
								<h2 className="mt-9 text-heading-l tablet:mt-10 desktop:mt-14">
									The most locally sourced food
								</h2>
								<p className="mt-3 tablet:mt-7">
									All our ingredients come directly from our farm or local
									fishery. So you can be sure that you’re eating the freshest,
									most sustainable food.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-cod-gray pb-24 pt-16 text-center text-white tablet:py-24 desktop:pb-[7.5rem] desktop:pt-[12.5rem] desktop:text-start">
				<div className={cx('', center)}>
					<div className="grid gap-20 tablet:gap-14 desktop:grid-cols-[445fr_125fr_540fr] desktop:gap-0">
						<div className="mx-auto max-w-[28.375rem] desktop:mx-0 desktop:max-w-none">
							<div className="flex justify-center desktop:justify-start">
								<Divide />
							</div>
							<h2 className="mt-9 text-heading-l tablet:mt-10 desktop:mt-14">
								A few highlights from our menu
							</h2>
							<p className="mt-3 tablet:mt-7">
								We cater for all dietary requirements, but here’s a glimpse at
								some of our diner’s favourites. Our menu is revamped every
								season.
							</p>
						</div>
						<div className="grid gap-6 desktop:col-start-3 desktop:pt-14">
							<Highlight
								image={{
									alt: 'Seared Salmon Fillet',
									desktopTablet: [salmonDesktopTablet, salmonDesktopTablet2x],
									mobile: [salmonMobile, salmonMobile2x],
								}}
								heading="Seared Salmon Fillet"
								body="Our locally sourced salmon served with a refreshing buckwheat summer salad."
							/>
							<HighlightDivider />
							<Highlight
								image={{
									alt: 'Rosemary Filet Mignon',
									desktopTablet: [beefDesktopTablet, beefDesktopTablet2x],
									mobile: [beefMobile, beefMobile2x],
								}}
								heading="Rosemary Filet Mignon"
								body="Our prime beef served to your taste with a delicious choice of seasonal sides."
							/>
							<HighlightDivider />
							<Highlight
								image={{
									alt: 'Summer Fruit Chocolate Mousse',
									desktopTablet: [
										chocolateDesktopTablet,
										chocolateDesktopTablet2x,
									],
									mobile: [chocolateMobile, chocolateMobile2x],
								}}
								heading="Summer Fruit Chocolate Mousse"
								body="Creamy mousse combined with summer fruits and dark chocolate shavings."
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="relative isolate pb-32 pt-20 text-center tablet:py-32 desktop:py-40 desktop:text-start">
				<div className="absolute inset-0 -z-10 hidden size-full justify-center overflow-hidden tablet:grid">
					<CurveTopRight className="-translate-x-[27.6875rem] desktop:-translate-x-[38.875rem]" />
				</div>
				<div className={cx('', outerCenter)}>
					<div className="grid desktop:grid-cols-[540fr_125fr_445fr]">
						<h2 className="sr-only">Events</h2>
						<Picture key={selectedEvent}>
							<DensitySource
								media={`(min-width: ${screens.desktop})`}
								images={[
									{ density: '1x', image: eventImages.desktop.density1 },
									{ density: '2x', image: eventImages.desktop.density2 },
								]}
							/>
							<DensitySource
								media={`(min-width: ${screens.tablet})`}
								images={[
									{ density: '1x', image: eventImages.tablet.density1 },
									{ density: '2x', image: eventImages.tablet.density2 },
								]}
							/>
							<DensityImage
								className="mx-auto shadow desktop:relative desktop:z-10 desktop:mx-0 desktop:w-full"
								alt=""
								images={[
									{ density: '1x', image: eventImages.mobile.density1 },
									{ density: '2x', image: eventImages.mobile.density2 },
								]}
							/>
						</Picture>
						{/* <Lines /> */}
						<Tabs.Root
							className="mt-12 tablet:mt-14 desktop:col-start-3 desktop:mt-0 desktop:grid desktop:grid-rows-[70fr_auto_5rem_auto_62fr]"
							orientation={
								desktopMatches
									? 'vertical'
									: tabletMatches
										? 'horizontal'
										: 'vertical'
							}
							value={selectedEvent}
							onValueChange={(event) => {
								assertValidEvent(event)
								setSelectedEvent(event)
							}}
						>
							<Tabs.List className="grid justify-items-center gap-4 tablet:grid-cols-[auto_auto_auto] tablet:gap-0 desktop:row-start-4 desktop:grid-cols-none desktop:justify-items-start desktop:gap-3">
								<EventTrigger value="family" text="Family Gathering" />
								<EventTrigger value="special" text="Special Events" />
								<EventTrigger value="social" text="Social Events" />
							</Tabs.List>
							<EventContent
								value="family"
								heading="Family Gathering"
								body="We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all."
							/>
							<EventContent
								value="special"
								heading="Special Events"
								body="Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you. We’ll be sure to mark your special date with an unforgettable meal."
							/>
							<EventContent
								value="social"
								heading="Social Events"
								body="Are you looking to have a larger social event? No problem! We’re more than happy to cater for big parties. We’ll work with you to make your event a hit with everyone."
							/>
						</Tabs.Root>
					</div>
				</div>
			</div>
			<div className="relative isolate bg-cod-gray py-20 text-center text-white tablet:pb-16 desktop:py-[5.5rem] desktop:text-start">
				<Picture>
					<DensitySource
						media={`(min-width: ${screens.desktop})`}
						images={[
							{ density: '1x', image: readyBgDesktop },
							{ density: '2x', image: readyBgDesktop2x },
						]}
					/>
					<DensitySource
						media={`(min-width: ${screens.tablet})`}
						images={[
							{ density: '1x', image: readyBgTablet },
							{ density: '2x', image: readyBgTablet2x },
						]}
					/>
					<DensityImage
						className="absolute inset-0 -z-10 size-full object-cover"
						alt=""
						images={[
							{ density: '1x', image: readyBgMobile },
							{ density: '2x', image: readyBgMobile2x },
						]}
					/>
				</Picture>
				<div className={outerCenter}>
					<div className="grid gap-5 tablet:gap-6 desktop:grid-cols-[1fr_auto] desktop:items-center">
						<h2 className="text-heading-l">Ready to make a reservation?</h2>
						<p>
							<BookingButton variant="onDark" />
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}

function Divide() {
	return (
		<div className="text-beaver">
			<Icon className="h-[0.4375rem] w-[4.4375rem]" name="pattern-divide" />
		</div>
	)
}

interface HighlightProps {
	heading: string
	body: string
	image: {
		alt: string
		desktopTablet: [Image, Image]
		mobile: [Image, Image]
	}
}

function Highlight({ heading, image, body }: HighlightProps) {
	return (
		<div className="grid tablet:grid-cols-[10rem_1fr] tablet:grid-rows-[auto_1fr] tablet:gap-x-[1.875rem] tablet:text-start">
			<h3 className="mt-9 text-heading-m tablet:mt-2">{heading}</h3>
			<div className="-order-1 tablet:row-span-full tablet:flex tablet:items-start">
				<Picture>
					<DensitySource
						media={`(min-width: ${screens.tablet})`}
						images={[
							{ density: '1x', image: image.desktopTablet[0] },
							{ density: '2x', image: image.desktopTablet[1] },
						]}
					/>
					<DensityImage
						className="mx-auto tablet:mx-0 tablet:h-auto tablet:w-32"
						alt={image.alt}
						images={[
							{ density: '1x', image: image.mobile[0] },
							{ density: '2x', image: image.mobile[1] },
						]}
					/>
				</Picture>
				<div className="mt-[1.125rem] hidden flex-grow border-t text-beaver tablet:block" />
			</div>
			<p className="mx-auto mt-[0.375rem] max-w-[28.375rem] text-body-2 tablet:col-start-2 tablet:mx-0 tablet:max-w-none">
				{body}
			</p>
		</div>
	)
}

function HighlightDivider() {
	return <div className="border-t text-white/15" />
}

interface BookingButtonProps extends Button.RootProps {}

function BookingButton(props: BookingButtonProps) {
	return (
		<Button.Root asChild {...props} className="min-w-[15.3125rem]">
			<Link to="/booking">
				<Button.Text>Book a table</Button.Text>
			</Link>
		</Button.Root>
	)
}

interface EventTriggerProps {
	value: Event
	text: string
	className?: string
}

function EventTrigger({ className, value, text }: EventTriggerProps) {
	return (
		<Tabs.Trigger
			className={cx(
				'group relative isolate inline-grid text-heading-s uppercase text-[hsl(0_0%_30%/50%)] transition-colors data-[state=active]:text-[hsl(0_0%_30%)] hocus:text-[hsl(0_0%_30%)]',
				className,
			)}
			value={value}
		>
			{text}
			<span className="absolute -z-10 w-12 self-end justify-self-center border-t text-beaver transition-opacity group-data-[state=inactive]:opacity-0 tablet:translate-y-[0.4375rem] desktop:-left-8 desktop:w-32 desktop:-translate-x-full desktop:translate-y-0 desktop:self-center desktop:justify-self-start" />
		</Tabs.Trigger>
	)
}

interface EventContentProps {
	value: Event
	heading: string
	body: string
}

function EventContent({ value, heading, body }: EventContentProps) {
	return (
		<Tabs.Content
			className="mx-auto max-w-[28.375rem] desktop:row-start-2 desktop:mx-0 desktop:max-w-none"
			value={value}
		>
			<h3 className="mt-7 text-heading-l tablet:mt-12 desktop:mt-0">
				{heading}
			</h3>
			<p className="mt-3 tablet:mt-5 desktop:min-h-[7.5rem]">{body}</p>
			<p className="mt-7 tablet:mt-[3.75rem]">
				<BookingButton />
			</p>
		</Tabs.Content>
	)
}
