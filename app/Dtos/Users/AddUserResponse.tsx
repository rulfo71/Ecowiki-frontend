export default class AddUserResponse {
  userId: string
  error: {code: string, message: string}

  constructor() {
    this.userId = ''
    this.error = {code: '', message:''}
  }
}