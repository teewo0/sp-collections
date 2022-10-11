/** Returns a json response when the request method is not handled*/
export function handleNoMatch(req, res) {
	res.status(400).json({ success: false, message: `Method '${req.method}' Not Allowed` })
}

/** Returns a json response when there is an error */
export function handleError(err, req, res, next) {
	let message = 'Something went wrong!'
	let error = {}
	if (process.env.NODE_ENV !== 'production') {
		message = err.message
		error = { ...err }
	}

	res.status(500).json({ success: false, message, error })
}
