export class SaveAnswerErrorEvent {
  constructor(
    public readonly userId: string,
    public readonly pollId: string,
    public readonly answers: any[],
    public readonly retryCounter: number = 0,
    public readonly errorCode: string,
  ) {}
}
