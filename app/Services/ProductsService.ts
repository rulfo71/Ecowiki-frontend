import Product from '../Models/ProductModel'

export const isEmptyProduct = (product: Product): boolean => {
    return (product.barcode === '' && product.description === '' && product.displayName === '' && product.material === '')
}
