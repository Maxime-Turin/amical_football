import { SET_TEAM_INFO } from '../actions/teamInfo';
import { RESET_APP } from '../actions/user';

export const initialState = {
  teamName: '',
  level: '',
  description: '',
  coachName: '',
  picture: '',
  field: '',
  postalCode: '',
  city: '',
};

const teamInfoReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_APP: {
      return initialState;
    }
    case SET_TEAM_INFO: {
      return {

        teamName: action.data.teamName,
        level: action.data.level,
        description: action.data.description,
        coachName: action.data.coachName,
        picture: action.data.picture,
        field: action.data.field,
        postalCode: action.data.postalCode,
        city: action.data.city,
      };
    }
    default:
      return state;
  }
};

export default teamInfoReducer;
