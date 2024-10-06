import { useState, useRef } from 'react'

const initialTimeLeft = 30_000
const key = 'counter'

export function useCounter(onTimeout: () => void) {
	const [timeLeft, _setTimeLeft] = useState(() => {
		const item = localStorage.getItem(key)
		if (typeof item === 'string') {
			return Number(item)
		} else {
			return initialTimeLeft
		}
	})
	const timeLeftRef = useRef(timeLeft)
	const intervalRef = useRef<ReturnType<typeof setInterval>>()

	function setTimeLeft(val: typeof timeLeft) {
		_setTimeLeft(val)
		timeLeftRef.current = val
		localStorage.setItem(key, val.toString())
	}

	function start() {
		if (intervalRef.current !== undefined) {
			return
		}

		let last = new Date().getTime()
		intervalRef.current = setInterval(() => {
			const current = new Date().getTime()
			const nextTimeLeft = Math.max(0, timeLeftRef.current - (current - last))
			setTimeLeft(nextTimeLeft)
			if (nextTimeLeft === 0) {
				onTimeout()
				stop()
			}

			last = current
		}, 100)
	}

	function stop() {
		clearInterval(intervalRef.current)
		intervalRef.current = undefined
	}

	function reset() {
		stop()
		setTimeLeft(initialTimeLeft)
	}

	return {
		timeLeft,
		start,
		stop,
		reset,
	}
}
