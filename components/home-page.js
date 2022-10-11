import { Fragment } from 'react'
import { useRouter } from 'next/router'

import Hero from './layout/hero'
import CollectionGrid from './collections/collection-grid'
import ProductGrid from './products/product-grid'
import classes from './home-page.module.css'

const ProductsPage = (props) => {
	const router = useRouter()

	const handleClick = () => {
		router.push('/products')
	}

	return (
		<div className={classes.container}>
			<Fragment>
				<Hero />
				<CollectionGrid collections={props.collections} />
				<ProductGrid products={props.products} />
			</Fragment>
			<div className={classes.btnWrapper}>
				<button className={classes.btn} onClick={handleClick}>
					View All products
				</button>
			</div>
		</div>
	)
}

export default ProductsPage
