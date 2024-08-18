// https://css-tricks.com/form-validation-web-audio/

const context = new window.AudioContext()

export function playSuccess() {
	// const successNoise = context.createOscillator()
	// successNoise.frequency = '600'
	// successNoise.type = 'sine'
	const successNoise = new OscillatorNode(context, {
		frequency: 600,
		type: 'sine',
	})
	successNoise.frequency.exponentialRampToValueAtTime(
		800,
		context.currentTime + 0.05,
	)
	successNoise.frequency.exponentialRampToValueAtTime(
		1000,
		context.currentTime + 0.15,
	)

	const successGain = context.createGain()
	successGain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3)

	// const successFilter = context.createBiquadFilter('bandpass')
	// successFilter.Q = 0.01
	const successFilter = new BiquadFilterNode(context, {
		type: 'bandpass',
		Q: 0.01,
	})

	successNoise
		.connect(successFilter)
		.connect(successGain)
		.connect(context.destination)
	successNoise.start()
	successNoise.stop(context.currentTime + 0.2)
}
