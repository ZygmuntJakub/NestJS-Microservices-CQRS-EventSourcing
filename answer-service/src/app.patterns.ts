export const SEND_ANSWER_PATTERN = { role: 'answer', cmd: 'send-answer' };

export const ANSWER_POLL_PROJECTION_PATTERN = {
  role: 'answer',
  cmd: 'answer-poll-projection',
};

export const VALIDATE_ANSWER_PATTERN = { role: 'poll', cmd: 'validate-answer' };
export const RESTORE_INVITATION_PATTERN = {
  role: 'poll',
  cmd: 'restore-invitation',
};

export const SEND_RESULT_PATTERN = { role: 'result', cmd: 'result-answer' };
