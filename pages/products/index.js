import { dbConnect } from '../../lib/db-utils'
import ProductModel from '../../models/product-model'
import { purify } from '../../lib/utils'

const ProductsPage = ({ products }) => {
	return <div>Products Page</div>
}

export async function getStaticProps() {
	try {
		await dbConnect()
		const results = await ProductModel.find()
		const products = purify(results)

		if (!products) {
			return { notFound: true }
		}

		return {
			props: { products },
			revalidate: 1,
		}
	} catch (error) {
		return { notFound: true }
	}
}

export default ProductsPage
