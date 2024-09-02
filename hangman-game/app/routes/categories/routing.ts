import { type ActionFunctionArgs, redirect } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { assertIsCategory, newGame } from '#app/utils/hangman'

export const handle = {
	announcement() {
		return 'Categories'
	},
} satisfies AnnouncementHandle

export const categoryName = 'category'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const category = formData.get(categoryName)
	assertIsCategory(category)

	newGame(category)

	return redirect('/play')
}
