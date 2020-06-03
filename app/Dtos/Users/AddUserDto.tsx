
export default class AddUserDto {

    nickname: string
    email: string
    password: string
    userId: string
    showContributions: boolean

    constructor() {
        this.userId = ''
        this.showContributions = false
        this.nickname=''
        this.email= ''
        this.password=''
      }
}