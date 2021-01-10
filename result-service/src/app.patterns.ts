export const GET_RESULTS_PATTERN = { role: 'result', cmd: 'get-results' };
export const SEND_RESULT_PATTERN = { role: 'result', cmd: 'result-answer' };
export const POLL_PROJECTION_PATTERN = {
  role: 'result',
  cmd: 'poll-projection',
};

export const ANSWER_POLL_PROJECTION_PATTERN = {
  role: 'answer',
  cmd: 'answer-poll-projection',
};
