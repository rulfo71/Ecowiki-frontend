import Product from '../Models/ProductModel'

export const isEmptyProduct = (product: Product): boolean => {
    return (product.BarCode === '' && product.Description === '' && product.Name === '' && product.Material === '')
}
