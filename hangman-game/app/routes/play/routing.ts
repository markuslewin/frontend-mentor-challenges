import { type ActionFunctionArgs, redirect } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { assertIsLetter } from '#app/utils/alphabet'
import { getState, guess } from '#app/utils/hangman'

export const handle = {
	announcement() {
		return 'Play'
	},
} satisfies AnnouncementHandle

export function loader() {
	try {
		const state = getState()
		return { state }
	} catch {
		throw redirect('/categories')
	}
}

export const letterName = 'letter'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const letter = formData.get(letterName)
	assertIsLetter(letter)

	guess(letter)
	return redirect('/play')
}
