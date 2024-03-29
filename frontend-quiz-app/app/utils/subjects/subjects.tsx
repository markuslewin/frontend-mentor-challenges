import { z } from 'zod'
import accessibility from './icon-accessibility.svg'
import css from './icon-css.svg'
import html from './icon-html.svg'
import js from './icon-js.svg'

export const SubjectsSchema = z.enum([
	'html',
	'css',
	'javascript',
	'accessibility',
])

function Tag({
	background,
	name,
	src,
}: {
	background: string
	name: string
	src: string
}) {
	return (
		<div className="grid grid-cols-[max-content_1fr] items-center gap-4 tablet:gap-6">
			<div
				className={`${background} grid size-10 place-items-center rounded-md border-1 border-transparent tablet:size-14 tablet:rounded-xl desktop:rounded-lg`}
			>
				<img className="h-[1.75rem] tablet:h-[2.5rem]" alt="" src={src} />
			</div>
			<p>{name}</p>
		</div>
	)
}

export const subjects = {
	html: {
		name: 'HTML',
		href: '/html',
		color: 'bg-[hsl(22_100%_96%)]',
		src: html,
		tag: <Tag background="bg-[hsl(22_100%_96%)]" name="HTML" src={html} />,
	},
	css: {
		name: 'CSS',
		href: '/css',
		color: 'bg-[hsl(151_87%_94%)]',
		src: css,
		tag: <Tag background="bg-[hsl(151_87%_94%)]" name="CSS" src={css} />,
	},
	javascript: {
		name: 'JavaScript',
		href: '/javascript',
		color: 'bg-[hsl(223_100%_96%)]',
		src: js,
		tag: <Tag background="bg-[hsl(223_100%_96%)]" name="JavaScript" src={js} />,
	},
	accessibility: {
		name: 'Accessibility',
		href: '/accessibility',
		color: 'bg-[hsl(277_100%_95%)]',
		src: accessibility,
		tag: (
			<Tag
				background="bg-[hsl(277_100%_95%)]"
				name="Accessibility"
				src={accessibility}
			/>
		),
	},
}
