import Image from 'next/image'

const Product = (props) => {
	const { product } = props

	const formatter = new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' })
	const formattedPrice = formatter.format(product.price)
	const newFmt = formattedPrice.toString().replace(/(.00)/g, '')

	return (
		<figure>
			<div>
				<Image
					src={`/images/products/${product.imageCover}`}
					alt={product.name}
					width={200}
					height={250}
					layout='responsive'
				/>
			</div>
			<figcaption>
				<h2>{product.name}</h2>
				<span>{formattedPrice}</span>
			</figcaption>
		</figure>
	)
}

export default Product
