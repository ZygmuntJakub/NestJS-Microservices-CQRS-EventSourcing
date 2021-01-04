import { IsNotEmpty } from 'class-validator';

export class QuestionAnswerDto {
  questionId: string;
  answerId: string;
}

export class AnswerDto {
  userId: string;
  pollId: string;
  @IsNotEmpty()
  answers: QuestionAnswerDto[];
}
