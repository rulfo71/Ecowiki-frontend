import Product from '../Models/ProductModel'
import { isEmpty } from 'lodash'

export const isEmptyProduct = (product: Product): boolean => {
    return (isEmpty(product.barcode) && isEmpty(product.observations) && isEmpty(product.displayName) && isEmpty(product.material))
}
