import { invariant } from '@epic-web/invariant'
import { useCallback, useState, useSyncExternalStore } from 'react'

export interface TimerOptions {
	duration: number
	onResolve(): void
}
export type Duration = TimerOptions['duration']

class Timer {
	#timeLeft: number
	#startTime: number | null
	#timeoutId: NodeJS.Timeout | null
	#options: TimerOptions
	#listeners: Set<() => void>

	constructor(options: TimerOptions) {
		this.#timeLeft = options.duration
		this.#startTime = null
		this.#timeoutId = null
		this.#options = options
		this.#listeners = new Set()
	}

	get timeLeft() {
		return this.#timeLeft
	}

	start() {
		if (this.#timeoutId === null) {
			this.#tick()
		}
	}

	pause() {
		if (this.#timeoutId !== null) {
			this.#updateTimeLeft()

			clearTimeout(this.#timeoutId)
			this.#timeoutId = null
		}
	}

	reset() {
		this.#timeLeft = this.#options.duration
		this.#startTime = null
		if (this.#timeoutId !== null) {
			clearTimeout(this.#timeoutId)
			this.#timeoutId = null
		}

		this.#notify()
	}

	setDuration(duration: Duration) {
		this.#options.duration = duration
		this.reset()
	}

	subscribe(callback: () => void) {
		this.#listeners.add(callback)
		return () => {
			this.#listeners.delete(callback)
		}
	}

	#tick() {
		this.#startTime = Date.now()
		const nextTimeout =
			this.#timeLeft <= 1000 ? this.#timeLeft : this.#timeLeft % 1000
		this.#timeoutId = setTimeout(() => {
			this.#updateTimeLeft()

			if (this.#timeLeft <= 0) {
				this.#options.onResolve()
			} else {
				this.#tick()
			}
		}, nextTimeout)
	}

	#updateTimeLeft() {
		invariant(this.#startTime !== null, 'No start time')

		this.#timeLeft = Math.max(
			0,
			this.#timeLeft - (Date.now() - this.#startTime),
		)
		this.#notify()
	}

	#notify() {
		this.#listeners.forEach((l) => {
			l()
		})
	}
}

export function useTimer(options: TimerOptions) {
	const [timer] = useState(() => new Timer(options))
	const timeLeft = useSyncExternalStore(
		useCallback((callback) => timer.subscribe(callback), [timer]),
		() => timer.timeLeft,
	)

	return {
		timeLeft,
		start() {
			timer.start()
		},
		pause() {
			timer.pause()
		},
		reset() {
			timer.reset()
		},
		setDuration(duration: Duration) {
			timer.setDuration(duration)
		},
	}
}
