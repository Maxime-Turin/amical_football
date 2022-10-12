import {
  CHANGE_USER_FIELD, LOGOUT, RESET_APP, SET_USER_DATA, TOKEN_EXPIRES, UPDATE_PICTURE,
} from '../actions/user';

export const initialState = {
  error: false,
  teamName: '',
  token: null,
  logged: false,
  level: '',
  description: '',
  coachName: '',
  picture: '',
  field: '',
  phone: '',
  postalCode: '',
  city: '',
  mail: '',
  password: '',
  passwordConfirm: '',
  teamSearch: '',
  doug: true,
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOKEN_EXPIRES: {
      return {
        ...state,
        doug: false,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    case CHANGE_USER_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,

      };
    case UPDATE_PICTURE:
      return {
        ...state,
        picture: action.data,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
