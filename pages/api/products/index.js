import nextConnect from 'next-connect'

import logger from '../../../middlewares/logger'
import imageUploadHandler from '../../../middlewares/multer'
import imageResizeHandler from '../../../middlewares/sharp'
import { handleNoMatch, handleError } from '../../../controllers/errorController'
import { getAllProducts, createProduct } from '../../../controllers/productController'

const handler = nextConnect({
	onNoMatch: handleNoMatch,
	onError: handleError,
})

handler.get(getAllProducts)
handler.use(imageUploadHandler).post(imageResizeHandler(createProduct))


export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
}

export default logger(handler)