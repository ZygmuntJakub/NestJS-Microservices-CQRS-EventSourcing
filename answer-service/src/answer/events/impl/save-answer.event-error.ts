export class SaveAnswerEventError {
  constructor(
    public readonly userId: string,
    public readonly pollId: string,
    public readonly answers: any[],
    public readonly retryCounter: number = 0,
  ) {}
}
