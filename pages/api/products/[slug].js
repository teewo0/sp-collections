import nextConnect from 'next-connect'

import logger from '../../../middlewares/logger'
import { handleNoMatch, handleError } from '../../../controllers/errorController'
import { getProduct, updateProduct } from '../../../controllers/productController'

const handler = nextConnect({
	onNoMatch: handleNoMatch,
	onError: handleError,
})

handler.get(getProduct)
handler.patch(updateProduct)

export default logger(handler)
