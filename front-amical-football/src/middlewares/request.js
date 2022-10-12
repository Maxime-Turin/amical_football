import { getTeamAnnounces } from '../actions/data';
import {
  ACCEPTED_REQUEST, MAKE_NEW_REQUEST, RECEIVED_REQUEST, REJECTED_REQUEST, setReceivedRequest,
} from '../actions/request';
import authToken from '../utils/authToken';
import instance from '../utils/axios';

const requestMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case RECEIVED_REQUEST: {
      const { user: { id, token } } = store.getState();
      authToken(token);
      try {
        console.log(id);
        const { data } = await instance.get(`/request_received/${id}`);
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      break; }
    case REJECTED_REQUEST: {
      const { user: { token } } = store.getState();
      authToken(token);

      try {
        console.log('REQUEST ID >>>', action.id);
        const { data } = await instance.delete('/delete_request', { data: { id: action.id } });
        store.dispatch(getTeamAnnounces());
      } catch (error) {
        console.log(error);
      }

      break; }
    case ACCEPTED_REQUEST: {
      const { user: { token } } = store.getState();
      authToken(token);

      try {
        console.log('REQUEST ID >>>', action.id);
        const { data } = await instance.post('/change_request_status', {
          requestId: action.id,
          requestStatus: 'accepted',
        });
        store.dispatch(getTeamAnnounces());
      } catch (error) {
        console.log(error);
      }

      break; }
    case MAKE_NEW_REQUEST: {
      const { user: { id, token } } = store.getState();
      authToken(token);

      try {
        const { data } = await instance.post('/new_request', {
          userId: id,
          announcementId: action.id,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      break; }

    default:
      next(action);
  }
};

export default requestMiddleware;
