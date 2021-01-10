import { AnswerCommandHandler } from './handlers/answer.handler';
import { AnswerCommand } from './impl/answer.command';
import { SaveAnswerCommand } from './impl/save-answer.command';
import { SaveAnswerCommandHandler } from './handlers/save-answer.handler';
import { ProjectionHandler } from './handlers/projection.handler';

export const CommandHandlers = [
  AnswerCommandHandler,
  SaveAnswerCommandHandler,
  ProjectionHandler,
];

export { AnswerCommand, SaveAnswerCommand, ProjectionHandler };
