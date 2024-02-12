import { type MetaFunction } from '@remix-run/node'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '#app/components/ui/tooltip.tsx'
import { cn } from '#app/utils/misc.tsx'
import { logos } from './logos/logos.ts'

export default function Index() {
	return (
		<main>
			{/*
				 <!-- Quiz menu start -->

  Welcome to the Frontend Quiz!
  Pick a subject to get started.

  HTML
  CSS
  JavaScript
  Accessibility

  <!-- Quiz menu end -->

  <!-- Quiz question start -->

  Question <!-- number --> of 10

  A
  B
  C
  D

  Submit answer

  <!-- Quiz question end -->

  <!-- Quiz completed start -->

  Quiz completed
  You scored...

  <!-- score --> out of 10

  <!-- Quiz completed end -->
				*/}
		</main>
	)
}
