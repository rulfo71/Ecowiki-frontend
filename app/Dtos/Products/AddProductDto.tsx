
export default class AddProductDto {
    // @IsOptional()
    barcode: string
    // @IsNotEmpty()
    material: string
    // @IsNotEmpty()
    name: string
    // @IsOptional()
    observations: string
    addedBy: string
    photoUrl: string
    // hasImage: boolean
    constructor() {
        this.barcode = ''
        this.material = ''
        this.observations = ''
        this.addedBy = ''
        this.photoUrl = ''
      }
}