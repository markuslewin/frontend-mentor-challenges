import { sleep } from '../../app/utils/sleep'

export default async (req: Request) => {
	// Cleanuri returns inappropriate links. Return some placeholder values.
	await sleep(1000)
	const alphabet = 'abcdefghijklmnopqrstuvwxyz'
	return Response.json({
		result_url: new Array(6)
			.fill(null)
			.map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
			.join(''),
	})

	// const body = await req.formData()
	// const response = await fetch('https://cleanuri.com/api/v1/shorten', {
	// 	method: req.method,
	// 	body,
	// })
	// const json = await response.json()
	// return Response.json(json)
}
