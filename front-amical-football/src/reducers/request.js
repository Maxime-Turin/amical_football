import { SET_RECEIVED_REQUEST } from '../actions/request';
import { RESET_APP } from '../actions/user';

export const initialState = {
  requestsReceived: [],

};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_APP:
      return initialState;
    case SET_RECEIVED_REQUEST:
      return {
        ...state,
        receivedRequest: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
