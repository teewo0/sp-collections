export default function logger(handler) {
	return function (req, res) {
		if (process.env.NODE_ENV !== 'production') {
			
			const requestTime = new Date(Date.now()).toISOString()
			console.log(`🧰 method: ${req.method},  Url: ${req.url}, Time: ${requestTime} `)
		}

		return handler(req, res)
	}
}
