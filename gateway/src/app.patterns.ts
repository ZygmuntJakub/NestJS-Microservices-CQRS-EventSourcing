export const AUTH_USER_PATTERN = { role: 'user', cmd: 'auth' };
export const AUTH_CHECK_USER_PATTERN = { role: 'user', cmd: 'check' };

export const GET_POLLS_PATTERN = { role: 'poll', cmd: 'get-polls' };
export const GET_POLL_PATTERN = { role: 'poll', cmd: 'get-poll' };
export const UPDATE_POLL_PATTERN = { role: 'poll', cmd: 'update-poll' };
export const DELETE_POLL_PATTERN = { role: 'poll', cmd: 'delete-poll' };
export const CREATE_POLL_PATTERN = { role: 'poll', cmd: 'create-poll' };

export const SEND_ANSWER_PATTERN = { role: 'answer', cmd: 'send-answer' };

export const GET_RESULTS_PATTERN = { role: 'result', cmd: 'get-results' };
