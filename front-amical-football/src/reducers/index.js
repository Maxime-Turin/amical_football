import { combineReducers } from 'redux';

import userReducer from './user';
import dataReducer from './data';
import teamInfoReducer from './teamInfo';

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  teamInfo: teamInfoReducer,
});

export default rootReducer;
