export const MAKE_NEW_REQUEST = 'MAKE_NEW_REQUEST';
export const RECEIVED_REQUEST = 'RECEIVED_REQUEST';
export const SET_RECEIVED_REQUEST = 'SET_RECEIVED_REQUEST';
export const ACCEPTED_REQUEST = 'ACCEPTED_REQUEST';
export const REJECTED_REQUEST = 'REJECTED_REQUEST';

export const rejectedRequest = (id) => ({
  type: REJECTED_REQUEST,
  id,
});

export const acceptedRequest = (id) => ({
  type: ACCEPTED_REQUEST,
  id,
});

export const setReceivedRequest = (data) => ({
  type: SET_RECEIVED_REQUEST,
  data,
});

export const receivedRequest = (id) => ({
  type: RECEIVED_REQUEST,
  id,
});

export const makeNewRequest = (id) => ({
  type: MAKE_NEW_REQUEST,
  id,
});
