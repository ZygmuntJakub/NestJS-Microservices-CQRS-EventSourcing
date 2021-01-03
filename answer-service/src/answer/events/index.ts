import { AnswerEvent } from './impl/answer.event';
import { SaveAnswerEvent } from './impl/save-answer.event';
import { SaveAnswerHandler } from './handlers/save-answer.handler';
import { AnswerEventHandler } from './handlers/answer.handler';

export const EventHandlers = [AnswerEventHandler, SaveAnswerHandler];
export { AnswerEvent, SaveAnswerEvent };
