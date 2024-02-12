import { type MetaFunction } from '@remix-run/node'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '#app/components/ui/tooltip.tsx'
import { cn } from '#app/utils/misc.tsx'
import { logos } from './logos/logos.ts'
import { subjects } from './subjects/subjects.ts'

export default function Index() {
	return (
		<main>
			<h1>Welcome to the Frontend Quiz!</h1>
			<p>Pick a subject to get started.</p>
			<ul>
				{subjects.map(subject => {
					return (
						<li key={subject.name}>
							<a href={subject.href}>{subject.name}</a>
						</li>
					)
				})}
			</ul>
		</main>
	)
}
