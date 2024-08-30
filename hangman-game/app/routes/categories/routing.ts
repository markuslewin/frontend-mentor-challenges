import { invariant } from '@epic-web/invariant'
import { type ActionFunctionArgs, redirect } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { categories, newGame, type Category } from '#app/utils/hangman'

export const handle = {
	announcement() {
		return 'Categories'
	},
} satisfies AnnouncementHandle

export const categoryName = 'category'

function assertCategory(value: any): asserts value is Category {
	invariant(categories.includes(value), `Invalid category "${value}"`)
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const category = formData.get(categoryName)
	assertCategory(category)

	newGame(category)

	return redirect('/play')
}
