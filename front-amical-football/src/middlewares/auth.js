import {
  LOGIN, resetApp, setUserData,
} from '../actions/user';
import authToken from '../utils/authToken';
import instance from '../utils/axios';

const authMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case LOGIN: {
      try {
        const { user: { mail, password } } = store.getState();

        const { data } = await instance.post('/login', {
          mail,
          password,
        });
        store.dispatch(resetApp());
        console.log(data);
        const allData = {
          id: data.user.id, picture: data.user.picture, teamName: data.user.teamName, token: data.token, error: false, logged: true, doug: true,
        };
        authToken(data.token);
        store.dispatch(setUserData(allData));
      } catch (error) {
        console.log(error);
        if (error) {
          const errorMsg = error.response.data.message;
          store.dispatch(setUserData({ error: true, errorMsg }));
        }
      }

      break;
    }

    default:
      next(action);
  }
};

export default authMiddleware;
