export class AnswerCommand {
  constructor(
    public readonly userId: string,
    public readonly pollId: string,
    public readonly answers: any[],
  ) {}
}
