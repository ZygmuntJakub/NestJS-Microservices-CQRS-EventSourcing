export const GET_POLLS_PATTERN = { role: 'poll', cmd: 'get-polls' };
export const CREATE_POLL_PATTERN = { role: 'poll', cmd: 'create-poll' };
export const VALIDATE_ANSWER_PATTERN = { role: 'poll', cmd: 'validate-answer' };
export const GET_POLL_PATTERN = { role: 'poll', cmd: 'get-poll' };
export const UPDATE_POLL_PATTERN = { role: 'poll', cmd: 'update-poll' };
export const DELETE_POLL_PATTERN = { role: 'poll', cmd: 'delete-poll' };
export const CHECK_INVITATIONS_PATTERN = {
  role: 'poll',
  cmd: 'check-invitations',
};
export const GET_INVITATION_POLL_PATTERN = {
  role: 'poll',
  cmd: 'get-invitation-poll',
};
export const RESTORE_INVITATION_PATTERN = {
  role: 'poll',
  cmd: 'restore-invitation',
};
