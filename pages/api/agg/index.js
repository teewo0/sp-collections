import { dbConnect } from '../../../lib/db-utils'
import Product from '../../../models/product-model'

// This is a temporary endpoint where i test my pipelines for this project.
// It will be deleted before deploymenet

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			await dbConnect()
			const pipe = await Product.aggregate([
				{
					$group: {
						_id: '$category',
						numOfDocs: { $sum: 1 },
						// my_doc: { $first: '$$ROOT' }, //Gets the first document in the group
						my_doc: { $push: '$$ROOT' }, //Gets all the documents in the group
					},
				},
			])

			res.status(200).json({ success: true, length: pipe.length, data: pipe })
		} catch (err) {
			res.status(500).json({ message: err.message })
		}
	}
}
