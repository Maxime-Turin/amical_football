export const GET_DEV_TEAM = 'GET_DEV_TEAM';
export const SET_DEV_TEAM = 'SET_DEV_TEAM';
export const GET_ALL_ANNOUNCES = 'GET_ALL_ANNOUNCES';
export const SET_ANNOUNCES = 'SET_ANNOUNCES';
export const GET_DEPARTMENT_LIST = 'GET_DEPARTMENT_LIST';
export const SET_DEPARTMENT_LIST = 'SET_DEPARTMENT_LIST';
export const DO_SEARCH = 'DO_SEARCH';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const CREATE_ANNOUNCE = 'CREATE_ANNOUNCE';
export const CHANGE_ANNOUNCE_FIELD = 'CHANGE_ANNOUNCE_FIELD';
export const CREATE_NEW_ANNOUNCE = 'CREATE_NEW_ANNOUNCE';
export const GET_TEAM_ANNOUNCES = 'GET_TEAM_ANNOUNCES';
export const SET_TEAM_ANNOUNCES = 'SET_TEAM_ANNOUNCES';
export const DELETE_ANNOUNCE = 'DELETE_ANNOUNCE';
export const GET_ALL_TEAMS = 'GET_ALL_TEAMS';
export const SET_ALL_TEAMS = 'SET_ALL_TEAMS';

export const setAllTeams = (data) => ({
  type: SET_ALL_TEAMS,
  data,
});

export const getAllTeams = () => ({
  type: GET_ALL_TEAMS,
});

export const deleteAnnounce = (id) => ({
  type: DELETE_ANNOUNCE,
  id,
});

export const setTeamAnnounces = (name, data) => ({
  type: SET_TEAM_ANNOUNCES,
  name,
  data,
});

export const getTeamAnnounces = () => ({
  type: GET_TEAM_ANNOUNCES,
});

export const createNewAnnounce = () => ({
  type: CREATE_NEW_ANNOUNCE,
});

export const changeAnnouncefield = (value, name) => ({
  type: CHANGE_ANNOUNCE_FIELD,
  value,
  name,
});

export const createAnnounce = (data) => ({
  type: CREATE_ANNOUNCE,
  data,
});

export const uploadPicture = (data) => ({
  type: UPLOAD_PICTURE,
  data,
});

export const doSearch = (data) => ({
  type: DO_SEARCH,
  data,
});

export const setDepartmentList = (data) => ({
  type: SET_DEPARTMENT_LIST,
  data,
});

export const getDepartmentList = () => ({
  type: GET_DEPARTMENT_LIST,
});

export const setDevTeam = (data) => ({
  type: SET_DEV_TEAM,
  data: data.devTeam,
});

export const getDevTeam = () => ({
  type: GET_DEV_TEAM,
});

export const setAnnounces = (data) => ({
  type: SET_ANNOUNCES,
  data: data.researchResult,
});

export const getAllAnnounces = () => ({
  type: GET_ALL_ANNOUNCES,
});
