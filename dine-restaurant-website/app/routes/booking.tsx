import { Link } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'

export const handle = {
	announcement() {
		return 'Reservations'
	},
} satisfies AnnouncementHandle

export function Booking() {
	return (
		<>
			<h1>Reservations</h1>
			<Link to="/">Home</Link>
		</>
	)
}

// Reservations

// We can’t wait to host you. If you have any special requirements please feel free to
// call on the phone number below. We’ll be happy to accommodate you.

// Name
// Email
// Pick a date
// Pick a time

// Make Reservation

// Marthwaite, Sedbergh
// Cumbria
// +00 44 123 4567

// Open Times
// Mon - Fri: 09:00 AM - 10:00 PM
// Sat - Sun: 09:00 AM - 11:30 PM
