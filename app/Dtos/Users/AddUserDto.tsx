
export default class AddUserDto {

    userId: string
    showContributions: boolean

    // hasImage: boolean
    constructor() {
        this.userId = ''
        this.showContributions = false
      }
}