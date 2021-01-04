export class QuestionAnswerDto {
  questionId: string;
  answerId: string;
}

export class AnswerDto {
  userId: string;
  pollId: string;
  answers: QuestionAnswerDto[];
}
