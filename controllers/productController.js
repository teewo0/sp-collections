import { dbConnect, setProductToSchema } from '../lib/db-utils'
import Product from '../models/product-model'

/** Get all products from products collection in database */
export async function getAllProducts(req, res) {
	try {
		await dbConnect()
		const allProducts = await Product.find({}).sort({ uploadedAt: -1 })

		res.status(200).json({
			success: true,
			results: allProducts.length,
			data: allProducts,
		})
	} catch (error) {
		throw new Error(error)
	}
}

/** Get product document from the products collection */
export async function getProduct(req, res) {
	const { slug } = req.query

	try {
		await dbConnect()

		const product = await Product.findOne({ slug })
		res.status(200).json({
			success: true,
			data: product,
		})
	} catch (error) {
		throw new Error(error)
	}
}

/** Create new product document to the products collection */
export async function createProduct(req, res) {
	const productObj = { ...req.body }
	const filterArr = [
		'name',
		'description',
		'brand',
		'category',
		'productType',
		'price',
		'color',
		'quantity',
		'discountPrice',
		'sizes',
	]

	const filtered = setProductToSchema(productObj, filterArr)

	try {
		await dbConnect()

		if (req.files.imageCover) {
			filtered.imageCover = req.files.imageCover
		}

		if (req.files.images) {
			filtered.images = req.files.images
		}

		const newProduct = await Product.create(filtered)

		res.status(201).json({
			status: 'success',
			message: 'New product was created successfully.',
			data: newProduct,
		})
	} catch (error) {
		throw new Error(error)
	}
}

/** Updates a product document in the products collection   */
export async function updateProduct(req, res) {
	const { slug } = req.query

	try {
		await dbConnect()

		const updateOptions = {
			new: true,
			runValidators: true,
		}

		const product = await Product.findOneAndUpdate({ slug }, req.body, updateOptions)
		res
			.status(200)
			.json({ success: true, message: 'Product was updated successfully', data: product })
	} catch (error) {
		throw new Error(error)
	}
}
