import { AnswerCommandHandler } from './handlers/answer.handler';
import { AnswerCommand } from './impl/answer.command';
import { SaveAnswerCommand } from './impl/save-answer.command';
import { SaveAnswerCommandHandler } from './handlers/save-answer.handler';

export const CommandHandlers = [AnswerCommandHandler, SaveAnswerCommandHandler];

export { AnswerCommand, SaveAnswerCommand };
