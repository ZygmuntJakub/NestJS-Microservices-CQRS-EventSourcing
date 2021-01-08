import { Injectable } from '@nestjs/common';

@Injectable()
export class ResultService {
  receiveAnswer(pollId, answers) {
    console.log(pollId, answers);
  }
}
