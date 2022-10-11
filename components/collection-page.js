import classes from './collection-page.module.css'

const SingleCollectionPage = (props) => {
	const {
		products,
		markdown: { data, content },
	} = props

	return (
		<section>
			<h1>{data.title} Collection</h1>
			<p>{data.summary}</p>
			{/* <CollectionGrid collections={props.products} /> */}
		</section>
	)
}

export default SingleCollectionPage
