import { Link } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'

export const handle = {
	announcement() {
		return 'Home'
	},
} satisfies AnnouncementHandle

export function Home() {
	return (
		<>
			<h1>Exquisite dining since 1989</h1>
			<Link to="/booking">Book a table</Link>
		</>
	)
}

// Exquisite dining since 1989

// Experience our seasonal menu in beautiful country surroundings. Eat the freshest produce from
// the comfort of our farmhouse.

// Book a table

// Enjoyable place for all the family

// Our relaxed surroundings make dining with us a great experience for everyone. We can even arrange
// a tour of the farm before your meal.

// The most locally sourced food

// All our ingredients come directly from our farm or local fishery. So you can be sure that you’re
// eating the freshest, most sustainable food.

// A few highlights from our menu

// We cater for all dietary requirements, but here’s a glimpse at some of our diner’s favourites.
// Our menu is revamped every season.

// Seared Salmon Fillet
// Our locally sourced salmon served with a refreshing buckwheat summer salad.

// Rosemary Filet Mignon
// Our prime beef served to your taste with a delicious choice of seasonal sides.

// Summer Fruit Chocolate Mousse
// Creamy mousse combined with summer fruits and dark chocolate shavings.

// Family Gathering
// Special Events
// Social Events

// Family Gathering
// We love catering for entire families. So please bring everyone along for a special meal with your
// loved ones. We’ll provide a memorable experience for all.

// Special Events
// Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you.
// We’ll be sure to mark your special date with an unforgettable meal.

// Social Events
// Are you looking to have a larger social event? No problem! We’re more than happy to cater for big
// parties. We’ll work with you to make your event a hit with everyone.

// Book a table

// Ready to make a reservation?

// Book a table

// Marthwaite, Sedbergh
// Cumbria
// +00 44 123 4567

// Open Times
// Mon - Fri: 09:00 AM - 10:00 PM
// Sat - Sun: 09:00 AM - 11:30 PM
