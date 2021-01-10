import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProjectionCommand } from '../impl/projection.command';
import { Answer } from '../../entities/answer.entity';

@CommandHandler(ProjectionCommand)
export class ProjectionHandler implements ICommandHandler<ProjectionCommand> {
  async execute(command: ProjectionCommand) {
    const { pollId } = command;
    try {
      Logger.log(
        `ProjectionHandler => start projection ${JSON.stringify(command)}`,
      );
      const events = await Answer.find({ pollId });
      const countedQuestions = {};
      events.forEach(({ answers }) => {
        answers.forEach(({ questionId, answerId }) => {
          if (countedQuestions[questionId])
            countedQuestions[questionId][answerId] += 1;
          else {
            countedQuestions[questionId] = {};
            countedQuestions[questionId][answerId] = 1;
          }
        });
      });
      Logger.log(
        `ProjectionHandler => end with success projection ${JSON.stringify(
          command,
        )}`,
      );
      return countedQuestions;
    } catch (err) {
      Logger.log(err);
      Logger.log(
        `ProjectionHandler => end with error projection ${JSON.stringify(
          command,
        )}`,
      );
    }
  }
}
