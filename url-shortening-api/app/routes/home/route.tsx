import { Form, Link } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { Img, Picture, Source } from '#app/components/picture'
import { media } from '#app/utils/screens'
import { type IconName } from '@/icon-name'

export function Home() {
	return (
		<>
			<div>
				<Img
					alt=""
					src="/images/illustration-working.svg"
					width="733"
					height="482"
					priority
				/>
				<div>
					<h1>More than just shorter links</h1>
					<p>
						Build your brand’s recognition and get detailed insights on how your
						links are performing.
					</p>
					<p>
						<Link to="#">Get Started</Link>
					</p>
				</div>
			</div>
			<Landmark.Root>
				<Picture>
					<Source
						media={media.tablet}
						srcSet="/images/bg-shorten-desktop.svg"
						width="1110"
						height="168"
					/>
					<Img
						alt=""
						src="/images/bg-shorten-mobile.svg"
						width="237"
						height="128"
					/>
				</Picture>
				<Landmark.Label>
					<h2>Shorten links</h2>
				</Landmark.Label>
				<Form>
					{/* todo: Conform */}
					<label>Link:</label>
					<input type="url" name="url" placeholder="Shorten a link here..." />
					<button>Shorten It!</button>
				</Form>
			</Landmark.Root>
			<h2>Advanced Statistics</h2>
			<p>
				Track how your links are performing across the web with our advanced
				statistics dashboard.
			</p>
			<StatCard
				icon="icon-brand-recognition"
				heading="Brand Recognition"
				body="Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content."
			/>
			<StatCard
				icon="icon-detailed-records"
				heading="Detailed Records"
				body="Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions."
			/>
			<StatCard
				icon="icon-fully-customizable"
				heading="Fully Customizable"
				body="Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
			/>
			<div>
				<Picture>
					<Source
						media={media.tablet}
						srcSet="/images/bg-boost-desktop.svg"
						width="1440"
						height="250"
					/>
					<Img
						alt=""
						src="/images/bg-boost-mobile.svg"
						width="375"
						height="300"
					/>
				</Picture>
				<h2>Boost your links today</h2>
				<p>
					<Link to="#">Get Started</Link>
				</p>
			</div>
		</>
	)
}

interface StatCardProps {
	icon: IconName
	heading: string
	body: string
}

function StatCard({ body, heading, icon }: StatCardProps) {
	return (
		<div>
			<Icon name={icon} />
			<h3>{heading}</h3>
			<p>{body}</p>
		</div>
	)
}
