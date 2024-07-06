import { invariant } from '@epic-web/invariant'
import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'
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
import patternCurveTopLeft from '#app/assets/patterns/pattern-curve-top-left.svg'
import patternCurveTopRight from '#app/assets/patterns/pattern-curve-top-right.svg'
import patternLines from '#app/assets/patterns/pattern-lines.svg'
import { Icon } from '#app/components/icon'
import {
	Picture,
	DensityImage,
	DensitySource,
	type Image,
} from '#app/components/picture'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { Button } from '#app/components/ui/button'
import { Logo } from '#app/components/ui/logo'
import { screens } from '#app/utils/screens'

export const handle = {
	announcement() {
		return 'Home'
	},
} satisfies AnnouncementHandle

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

	const eventImages = getEventImages(selectedEvent)

	return (
		<>
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
					alt=""
					priority
					images={[
						{ density: '1x', image: heroBgMobile },
						{ density: '2x', image: heroBgMobile2x },
					]}
				/>
			</Picture>
			<header>
				<Logo />
			</header>
			<main>
				<h1 className="text-heading-xl">Exquisite dining since 1989</h1>
				<p>
					Experience our seasonal menu in beautiful country surroundings. Eat
					the freshest produce from the comfort of our farmhouse.
				</p>
				<p>
					<Button to="/booking">Book a table</Button>
				</p>
				<PatternCurveTopRight />
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
						alt=""
						images={[
							{ density: '1x', image: enjoyablePlaceMobile },
							{ density: '2x', image: enjoyablePlaceMobile2x },
						]}
					/>
				</Picture>
				<Divide />
				<h2>Enjoyable place for all the family</h2>
				<p>
					Our relaxed surroundings make dining with us a great experience for
					everyone. We can even arrange a tour of the farm before your meal.
				</p>
				<PatternCurveTopLeft />
				<Picture>
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
						alt=""
						images={[
							{ density: '1x', image: locallySourcedMobile },
							{ density: '2x', image: locallySourcedMobile2x },
						]}
					/>
				</Picture>
				<PatternLines />
				<Divide />
				<h2>The most locally sourced food</h2>
				<p>
					All our ingredients come directly from our farm or local fishery. So
					you can be sure that you’re eating the freshest, most sustainable
					food.
				</p>
				<Divide />
				<h2>A few highlights from our menu</h2>
				<p>
					We cater for all dietary requirements, but here’s a glimpse at some of
					our diner’s favourites. Our menu is revamped every season.
				</p>
				<Highlight
					image={{
						alt: 'Seared Salmon Fillet',
						desktopTablet: [salmonDesktopTablet, salmonDesktopTablet2x],
						mobile: [salmonMobile, salmonMobile2x],
					}}
					heading="Seared Salmon Fillet"
					body="Our locally sourced salmon served with a refreshing buckwheat summer salad."
				/>
				<Highlight
					image={{
						alt: 'Rosemary Filet Mignon',
						desktopTablet: [beefDesktopTablet, beefDesktopTablet2x],
						mobile: [beefMobile, beefMobile2x],
					}}
					heading="Rosemary Filet Mignon"
					body="Our prime beef served to your taste with a delicious choice of seasonal sides."
				/>
				<Highlight
					image={{
						alt: 'Summer Fruit Chocolate Mousse',
						desktopTablet: [chocolateDesktopTablet, chocolateDesktopTablet2x],
						mobile: [chocolateMobile, chocolateMobile2x],
					}}
					heading="Summer Fruit Chocolate Mousse"
					body="Creamy mousse combined with summer fruits and dark chocolate shavings."
				/>
				<PatternCurveTopRight />
				<h2>Events</h2>
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
						alt=""
						images={[
							{ density: '1x', image: eventImages.mobile.density1 },
							{ density: '2x', image: eventImages.mobile.density2 },
						]}
					/>
				</Picture>
				<PatternLines />
				<Tabs.Root
					value={selectedEvent}
					onValueChange={(event) => {
						assertValidEvent(event)
						setSelectedEvent(event)
					}}
				>
					<Tabs.List>
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
						alt=""
						images={[
							{ density: '1x', image: readyBgMobile },
							{ density: '2x', image: readyBgMobile2x },
						]}
					/>
				</Picture>
				<h2>Ready to make a reservation?</h2>
				<p>
					<Button to="/booking">Book a table</Button>
				</p>
			</main>
		</>
	)
}

function Divide() {
	return <Icon className="h-[0.4375rem] w-[4.4375rem]" name="pattern-divide" />
}

function PatternCurveTopRight() {
	return (
		<img
			alt=""
			loading="lazy"
			src={patternCurveTopRight}
			width="895"
			height="320"
		/>
	)
}

function PatternCurveTopLeft() {
	return (
		<img
			alt=""
			loading="lazy"
			src={patternCurveTopLeft}
			width="895"
			height="320"
		/>
	)
}

function PatternLines() {
	return (
		<img alt="" loading="lazy" src={patternLines} width="160" height="76" />
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
		<>
			<h3>{heading}</h3>
			<Picture>
				<DensitySource
					media={`(min-width: ${screens.tablet})`}
					images={[
						{ density: '1x', image: image.desktopTablet[0] },
						{ density: '2x', image: image.desktopTablet[1] },
					]}
				/>
				<DensityImage
					alt={image.alt}
					images={[
						{ density: '1x', image: image.mobile[0] },
						{ density: '2x', image: image.mobile[1] },
					]}
				/>
			</Picture>
			<p>{body}</p>
		</>
	)
}

interface EventTriggerProps {
	value: Event
	text: string
}

function EventTrigger({ value, text }: EventTriggerProps) {
	return <Tabs.Trigger value={value}>{text}</Tabs.Trigger>
}

interface EventContentProps {
	value: Event
	heading: string
	body: string
}

function EventContent({ value, heading, body }: EventContentProps) {
	return (
		<Tabs.Content value={value}>
			<h3>{heading}</h3>
			<p>{body}</p>
			<p>
				<Button to="/booking">Book a table</Button>
			</p>
		</Tabs.Content>
	)
}
