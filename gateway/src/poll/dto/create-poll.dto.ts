import { QuestionDto } from './question.dto';
import { InvitationDto } from './invitation.dto';

export class CreatePollDto {
  title: string;
  questions: QuestionDto[];
  invitations: InvitationDto[];
}
