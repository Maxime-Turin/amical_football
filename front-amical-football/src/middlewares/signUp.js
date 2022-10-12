import { setUserData, SIGNUP } from '../actions/user';
import instance from '../utils/axios';

const signUpMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case SIGNUP: {
      const {
        user: {
          teamName,
          mail,
          password,
          passwordConfirm,
          level,
          field,
          phone,
          postalCode,
          city,
          coachName,
          description,
        },
      } = store.getState();

      try {
        const { data } = await instance.post('/sign_in', {
          teamName,
          mail,
          password,
          passwordConfirm,
          level,
          picture: 'https://res.cloudinary.com/dfpxxeqil/image/upload/v1662367550/zhjcbsnbtzrnkpyonut7.png',
          description,
          coachName,
          field,
          phone,
          postalCode,
          city,
        });
        store.dispatch(setUserData({ signup: true }));
      } catch (error) {
        const errorMsg = error.response.data.message;
        store.dispatch(setUserData({ error: true, errorMsg }));
      }

      break;
    }
    default:
      next(action);
  }
};

export default signUpMiddleware;
