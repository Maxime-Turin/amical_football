import {
  CHANGE_ANNOUNCE_FIELD,
  SET_ALL_TEAMS,
  SET_ANNOUNCES,
  SET_DEPARTMENT_LIST,
  SET_DEV_TEAM,
  SET_TEAM_ANNOUNCES,
} from '../actions/data';
import { RESET_APP } from '../actions/user';

export const initialState = {

  date: '',
  place: '',
  category: '',
  field: '',
  teamAnnounce: [],
  requestsReceived: [],
  sentAnnounce: [],
  loader: true,

};

const dataReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_TEAMS: {
      return {
        ...state,
        ...action.data,
        loader: false,
      };
    }
    case RESET_APP:
      return initialState;
    case CHANGE_ANNOUNCE_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_DEV_TEAM:
      return {
        ...state,
        devTeam: action.data,
      };
    case SET_ANNOUNCES:
      return {
        ...state,
        researchResult: action.data,
      };
    case SET_TEAM_ANNOUNCES:
      return {
        ...state,
        date: '',
        place: '',
        category: '',
        field: '',
        [action.name]: action.data,
      };
    case SET_DEPARTMENT_LIST:
      return {
        ...state,
        departmentList: action.data,
      };
    default:
      return state;
  }
};

export default dataReducer;
