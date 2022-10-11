import { dbConnect } from '../../lib/db-utils'
import ProductModel from '../../models/product-model'
import { purify } from '../../lib/utils'

import Image from 'next/image'

const ProductPage = (props) => {
	const { product } = props

	return (
		<div>
			<h1>{product.name}</h1>
			<div>
				<h2>Image Cover</h2>
				<Image
					src={`/images/products/${product.imageCover}`}
					alt={product.name}
					width={500}
					height={500}
				/>
			</div>
			<div>
				<h2>Other Images</h2>
				{product.images.map((image) => (
					<Image
						key={image}
						src={`/images/products/${image}`}
						width={300}
						height={200}
						alt={image}
					/>
				))}
			</div>
			<p>{product.description}</p>
		</div>
	)
}

export async function getStaticProps(context) {
	const { slug } = context.params
	try {
		await dbConnect()

		const results = await ProductModel.findOne({ slug })
		const product = purify(results)

		if (!product) {
			return { notFound: true }
		}

		return {
			props: { product },
			revalidate: 1,
		}
	} catch (error) {
		return { notFound: true }
	}
}

export async function getStaticPaths() {
	try {
		await dbConnect()
		const products = await ProductModel.find({})

		const slugPaths = products.map((product) => {
			const result = purify(product)
			return { params: { slug: result.slug } }
		})

		return {
			paths: slugPaths,
			fallback: 'blocking',
		}
	} catch (error) {
		return { notFound: true }
	}
}

export default ProductPage
