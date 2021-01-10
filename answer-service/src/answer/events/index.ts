import { ValidateAnswerEvent } from './impl/validate-answer.event';
import { SaveAnswerEvent } from './impl/save-answer.event';
import { SaveAnswerHandler } from './handlers/save-answer.handler';
import { ValidateAnswerEventHandler } from './handlers/validate-answer.handler';
import { SaveAnswerErrorHandler } from './handlers/save-answer-error.handler';
import { SaveAnswerSuccessEventHandler } from './handlers/save-answer-success.handler';
import { CompensationAnswerHandler } from './handlers/compensation-answer.handler';

export const EventHandlers = [
  ValidateAnswerEventHandler,
  SaveAnswerHandler,
  SaveAnswerErrorHandler,
  SaveAnswerSuccessEventHandler,
  CompensationAnswerHandler,
];
export {
  ValidateAnswerEvent,
  SaveAnswerEvent,
  SaveAnswerErrorHandler,
  SaveAnswerSuccessEventHandler,
  CompensationAnswerHandler,
};
