export default class UnregisteredProductModel {
  addedBy: string
  barcode: string
  name: string
  observations: string
  photoUrl: string

  constructor() {
    this.addedBy = ''
    this.barcode = ''
    this.name = ''
    this.observations = ''
    this.photoUrl = ''
  }
}
