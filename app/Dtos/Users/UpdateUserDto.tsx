
export default class UpdateUserDto {
  userId: string
  fieldToUpdate: string
  newValue
  constructor() {
    this.userId = ''
    this.fieldToUpdate = ''
  }
}