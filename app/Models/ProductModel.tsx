export default class ProductModel {
  barcode: string
  material: string
  displayName: string
  observations: string
  detailsId: string
  addedBy: string
  photoUrl: string

  constructor() {
    this.barcode = ''
    this.material = ''
    this.displayName = ''
    this.observations = ''
    this.detailsId = ''
    this.addedBy = ''
    this.photoUrl = ''
  }
}
