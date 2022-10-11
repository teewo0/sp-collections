import { useRouter } from 'next/router'
import Image from 'next/image'

import CollectionButton from './collection-button'
import classes from './collection-card.module.css'

const CollectionCard = (props) => {

	const router = useRouter()

	const collectionsPagePath = `/${props.params}`
	const imageSource = `/images/collections/${props.params}/${props.image}`

	function handleClick() {
		router.push(collectionsPagePath)
	}

	return (
		<div className={classes.container}>
			<div className={classes.imgWrapper}>
				<Image
					className={classes.image}
					src={imageSource}
					alt={props.title}
					width={200}
					height={150}
					layout='responsive'
				/>
			</div>
			<h3>{props.title}</h3>
			<p>{props.summary}</p>
			<CollectionButton handleClick={handleClick} text='view collection' />
		</div>
	)
}

export default CollectionCard
