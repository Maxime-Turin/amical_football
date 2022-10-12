export const LOGIN = 'LOGIN';
export const SET_USER_DATA = 'SET_USER_DATA';
export const CHANGE_USER_FIELD = 'CHANGE_USER_FIELD';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const SEND_NEW_INFOS = 'SEND_NEW_INFOS';
export const UPDATE_PICTURE = 'UPDATE_PICTURE';
export const RESET_APP = 'RESET_APP';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_TEAM_INFO = 'GET_TEAM_INFO';
export const TRY_TOKEN = 'TRY_TOKEN';
export const TOKEN_EXPIRES = 'TOKEN_EXPIRES';

export const tokenExpires = () => ({
  type: TOKEN_EXPIRES,
});

export const tryToken = () => ({
  type: TRY_TOKEN,
});

export const getTeamInfo = (id) => ({
  type: GET_TEAM_INFO,
  id,
});

export const getUserInfo = () => ({
  type: GET_USER_INFO,
});

export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});

export const resetApp = () => ({
  type: RESET_APP,
});

export const updatePicture = (data) => ({
  type: UPDATE_PICTURE,
  data,
});

export const sendNewInfos = () => ({
  type: SEND_NEW_INFOS,
});

export const login = () => ({
  type: LOGIN,
});

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  data,
});

export const changeUserField = (value, name) => ({
  type: CHANGE_USER_FIELD,
  value,
  name,
});

export const logout = () => ({
  type: LOGOUT,
});

export const signup = () => ({
  type: SIGNUP,
});
