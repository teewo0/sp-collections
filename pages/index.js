import { Fragment} from 'react'

import { getCollectionFiles } from '../lib/collection-utils'
import { getProductsByCategory } from '../lib/db-utils'

import Hero from '../components/layout/hero'
import classes from '../styles/Home.module.css'
import CollectionGrid from '../components/collections/collection-grid'
import Product from '../components/products/product-grid'

export default function Home(props) {

	return (
		<div className={classes.section}>
			<Fragment>
				<Hero />
				<CollectionGrid collections={props.collections} />
				<Product products={props.products} />

			</Fragment>
		</div>
	)
}

export async function getStaticProps() {

	//Get markdown meta-data for  collections
	const markdownDataObj = getCollectionFiles()
	const collectionMetaData = markdownDataObj.map((result) => result.data)

	try {

		//Get the documents in each Products collection category
		const groupedDocs = await getProductsByCategory()

		if (!groupedDocs) return { notFound: true }

		//Lets get one random item from each category
		const randomItemsByCategory = groupedDocs.map((doc) => {
			const collectionDocs = doc.group
			const randomIndex = Math.floor(Math.random() * collectionDocs.length)
			const randomItem = collectionDocs[randomIndex]
			return randomItem
		})

		return {
			props: {
				collections: collectionMetaData,
				products: randomItemsByCategory,
			},
			revalidate: 600,
		}
	} catch (e) {
		return { notFound: true }
	}
}
