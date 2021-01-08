import { ValidateAnswerEvent } from './impl/validate-answer.event';
import { SaveAnswerEvent } from './impl/save-answer.event';
import { SaveAnswerHandler } from './handlers/save-answer.handler';
import { ValidateAnswerEventHandler } from './handlers/validate-answer.handler';

export const EventHandlers = [ValidateAnswerEventHandler, SaveAnswerHandler];
export { ValidateAnswerEvent, SaveAnswerEvent };
