import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnswerEvent } from '../events';
import { SaveAnswerCommand } from '../commands';

@Injectable()
export class AnswerSaga {
  @Saga()
  answerSent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AnswerEvent),
      map((event) => new SaveAnswerCommand(event.pollId)),
    );
  };
}
