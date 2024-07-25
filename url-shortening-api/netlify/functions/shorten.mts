export default async (req: Request) => {
	const body = await req.formData()
	const response = await fetch('https://cleanuri.com/api/v1/shorten', {
		method: req.method,
		body,
	})
	const json = await response.json()
	return Response.json(json)
}
