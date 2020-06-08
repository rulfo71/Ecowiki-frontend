export default class AddVoteDto {
  name: string
  detailsId: string
  userId: string

  constructor() {
    this.name = ''
    this.detailsId = ''
    this.userId = ''
  }
}
