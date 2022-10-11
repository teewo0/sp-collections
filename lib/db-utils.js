import mongoose from 'mongoose'
import ProductModel from '../models/product-model'
import { purify } from './utils'

const DB_URI = process.env.DATABASE_CONNECT_STRING
const connection = {}

/** Connects to mongoDb with mongoose.connect method  */
export async function dbConnect() {
	if (connection.isConnected) return

	try {
		const db = await mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		connection.isConnected = db.connections[0].readyState === 1
	} catch (error) {
		throw new Error(error)
	}
}

export async function getProductsByCategory() {
	try {
		await dbConnect()

		const groups = await ProductModel.aggregate([
			{
				$group: {
					_id: '$category',
					group: { $push: '$$ROOT' },
				},
			},
		])

		return purify(groups)
	} catch (error) {
		throw new Error(error)
	}
}

/** Returns a modified object with properties set to match schema specs*/
export function setProductToSchema(obj, arr) {
	const objectToModelSchema = {}

	//Set the data type of the product's value to match the Schema
	arr.forEach((element) => {
		if (element === 'quantity') {
			// Convert value to Number data type
			return (objectToModelSchema[element] = +obj[element])
		}

		if (element === 'sizes') {
			// Lets make sure of no duplicates
			const sizesArray = obj[element].split(',') //Split to an array
			const unique = [...new Set(sizesArray)] // Remove duplicates

			return (objectToModelSchema[element] = unique)
		}

		if (element === 'price' || element === 'discountPrice') {
			const initialValue = obj[element]

			const valueFormatted = initialValue.replace(/,/g, '') //lets remove commas
			const finalValue = valueFormatted ? +valueFormatted : +initialValue //convert to Number

			return (objectToModelSchema[element] = finalValue)
		}

		objectToModelSchema[element] = obj[element]
	})

	return objectToModelSchema
}
