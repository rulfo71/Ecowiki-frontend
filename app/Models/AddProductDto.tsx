
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
    hasImage: boolean
}