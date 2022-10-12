import {
  DELETE_ACCOUNT, GET_TEAM_INFO, GET_USER_INFO, resetApp, SEND_NEW_INFOS, setUserData, tokenExpires, TRY_TOKEN,
} from '../actions/user';
import {
  setTeamInfo,
} from '../actions/teamInfo';
import authToken from '../utils/authToken';
import instance from '../utils/axios';

const userMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case TRY_TOKEN: {
      const { user: { id, token } } = store.getState();
      authToken(token);
      if (token) {
        try {
          const { data } = await instance.get(`/user/${id}`);
          console.log(data);
        } catch (error) {
          if (!error.response.data.doug) {
            store.dispatch(tokenExpires());
          }
        }
      }
      break;
    }

    case GET_TEAM_INFO: {
      const { user: { token } } = store.getState();
      const { id } = action;
      authToken(token);
      try {
        const { data } = await instance.get(`/user/${id}`);
        store.dispatch(setTeamInfo(data.user));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case GET_USER_INFO: {
      const { user: { id, token } } = store.getState();
      authToken(token);
      try {
        const { data } = await instance.get(`/user/${id}`);
        store.dispatch(setUserData(data.user));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case SEND_NEW_INFOS: {
      const { user: { token } } = store.getState();
      authToken(token);
      const { user: { id } } = store.getState();
      const {
        user: {
          teamName, mail, description, field, level, phone, city, postalCode, picture,
        },
      } = store.getState();
      try {
        const { data } = await instance.post(`/user/${id}`, {
          teamName,
          mail,
          description,
          field,
          level,
          picture,
          phone,
          city,
          postalCode,
        });
        store.dispatch(setUserData(data.user[0]));
      } catch (error) {
        console.log(error);
      }

      break;
    }
    case DELETE_ACCOUNT: {
      const { user: { token, id } } = store.getState();
      console.log(id);
      authToken(token);
      try {
        const data = await instance.delete('/delete_user', { data: { id } });
        console.log(data);
        store.dispatch(resetApp());
      } catch (error) {
        console.log(error);
      }
      break;
    }
    default:
      next(action);
  }
};

export default userMiddleware;
