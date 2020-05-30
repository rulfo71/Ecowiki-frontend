export default class ProductModel {
  barcode: string
  material: string
  displayName: string
  description: string
  detailsId: string
  addedBy: string

  constructor() {
    this.barcode = ''
    this.material = ''
    this.displayName = ''
    this.description = ''
    this.detailsId = ''
    this.addedBy = ''
  }
}
