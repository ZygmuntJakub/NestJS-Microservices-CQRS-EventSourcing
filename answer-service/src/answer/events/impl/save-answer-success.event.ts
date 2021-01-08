export class SaveAnswerSuccessEvent {
  constructor(public readonly pollId: string, public readonly answers: any[]) {}
}
