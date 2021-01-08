import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';

@Injectable()
export class AnswerSaga {
  @Saga()
  answerSent = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe
      // ofType(ValidateAnswerEvent),
      // map((event) => new SaveAnswerCommand(event.pollId)),
      ();
  };
}
