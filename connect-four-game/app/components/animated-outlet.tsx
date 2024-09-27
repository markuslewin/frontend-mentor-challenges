import { AnimatePresence } from 'framer-motion'
import { cloneElement } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

// https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r
// https://medium.com/@antonio.falcescu/animating-react-pages-with-react-router-dom-outlet-and-framer-motion-animatepresence-bd5438b3433b
export default function AnimatedOutlet() {
	const location = useLocation()
	const element = useOutlet()
	return (
		<AnimatePresence mode="wait" initial={false}>
			{element && cloneElement(element, { key: location.key })}
		</AnimatePresence>
	)
}
