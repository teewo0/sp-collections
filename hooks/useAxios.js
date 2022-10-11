import { useState, useEffect } from 'react'
import axios from 'axios'

function useAxios(url) {

	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

		
	useEffect(() => {
		async function getData() {
			return await axios.get(url)
		}

		getData()
			.then((res) => setData(res.data))
			.catch((err) => setError(err.response.data))
	},[ url])

	return { data, error }
}

export default useAxios
