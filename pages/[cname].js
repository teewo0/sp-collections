import { purify } from '../lib/utils'
import { getCollectionFiles, getCollectionData } from '../lib/collection-utils'

import { dbConnect } from '../lib/db-utils'
import ProductModel from '../models/product-model'
import SingleCollectionPage from '../components/collection-page'

const CollectionPage = (props) => {
	return <SingleCollectionPage {...props} />
}


export async function getStaticProps(context) {
	
	const { cname } = context.params
	const markdownData = getCollectionData(cname)

	try {
		await dbConnect()

		const docs = await ProductModel.find({ category: cname })

		if (!docs) return { notFound: true }

		return {
			props: {
				products: purify(docs),
				markdown: markdownData,
			},
		}
	} catch (e) {
		return { notFound: true }
	}
}

export async function getStaticPaths() {
	const files = getCollectionFiles()

	const paths = files.map((file) => ({
		params: { cname: file.data.params },
	}))

	return {
		paths,
		fallback: false,
	}
}

export default CollectionPage
