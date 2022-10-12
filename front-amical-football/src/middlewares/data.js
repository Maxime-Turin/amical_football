import {
  setDevTeam,
  GET_DEV_TEAM,
  GET_ALL_ANNOUNCES,
  setAnnounces,
  GET_DEPARTMENT_LIST,
  setDepartmentList,
  DO_SEARCH,
  UPLOAD_PICTURE,
  CREATE_NEW_ANNOUNCE,
  GET_TEAM_ANNOUNCES,
  setTeamAnnounces,
  DELETE_ANNOUNCE,
  getTeamAnnounces,
  GET_ALL_TEAMS,
  setAllTeams,
} from '../actions/data';
import { updatePicture } from '../actions/user';
import authToken from '../utils/authToken';
import instance, { apiGouv, cloudinaryApi } from '../utils/axios';

const dataMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case GET_ALL_TEAMS: {
      const { user: { token } } = store.getState();
      authToken(token);
      try {
        const { data } = await instance.get('/user/all');
        console.log(data);
        store.dispatch(setAllTeams(data));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case DELETE_ANNOUNCE: {
      const { user: { token } } = store.getState();
      authToken(token);
      try {
        const data = await instance.delete('/delete_announcement', {
          data: { id: action.id },
        });

        store.dispatch(getTeamAnnounces());
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case CREATE_NEW_ANNOUNCE: {
      const {
        data: {
          date, place, field, category,
        },
      } = store.getState();
      const { user: { id, token } } = store.getState();
      authToken(token);
      try {
        const { data } = await instance.post(`/user_announcement/${id}`, {
          level: category,
          date,
          place,
          field,

        });
        store.dispatch(getTeamAnnounces());
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case UPLOAD_PICTURE: {
      try {
        const newPicture = await cloudinaryApi.post(
          '/v1_1/dfpxxeqil/image/upload',
          action.data,
        );

        store.dispatch(updatePicture(newPicture.data.url));
      } catch (error) {
        console.log(error);
      }
      break;
    }

    case GET_DEV_TEAM: {
      try {
        const { data } = await instance.get('/dev_team');

        store.dispatch(setDevTeam(data));
      } catch (error) {
        console.log(error);
      }

      break;
    }
    case GET_ALL_ANNOUNCES: {
      const { user: { token } } = store.getState();
      authToken(token);
      try {
        const { data } = await instance.get('/search_announcements/+++');
        store.dispatch(setAnnounces(data));
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      break;
    }
    case GET_TEAM_ANNOUNCES: {
      const { user: { id, token } } = store.getState();
      authToken(token);
      try {
        const { data: myAnnounce } = await instance.get(`/user_announcement/${id}`);
        const { data: receivedAnnounce } = await instance.get(`/request_received/${id}`);
        const { data: sentAnnounce } = await instance.get(`/request_sended/${id}`);

        console.log(receivedAnnounce);

        store.dispatch(setTeamAnnounces('teamAnnounce', myAnnounce.announcements));
        store.dispatch(setTeamAnnounces('requestsReceived', receivedAnnounce.requestsReceived));
        store.dispatch(setTeamAnnounces('requestsSended', sentAnnounce.requestsSended));
      } catch (error) {
        console.log(error);
      }

      break;
    }

    case GET_DEPARTMENT_LIST: {
      try {
        const { data } = await apiGouv.get('/departements?fields=nom,code,codeRegion');
        store.dispatch(setDepartmentList(data));
      } catch (error) {
        console.log(error);
      }
      break;
    }

    case DO_SEARCH: {
      const { user: { token } } = store.getState();
      authToken(token);
      const {
        depValue, fieldValue, categoryValue, dateValue,
      } = action.data;
      try {
        const { data } = await instance.get(`/search_announcements/${depValue}+${dateValue}+${categoryValue}+${fieldValue}`);
        store.dispatch(setAnnounces(data));
      } catch (error) {
        console.log(error);
      }
      break;
    }

    default:
      next(action);
  }
};

export default dataMiddleware;
