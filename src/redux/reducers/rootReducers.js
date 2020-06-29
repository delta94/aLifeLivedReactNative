import {combineReducers} from 'redux';

// Individual Reducers
import userReducer from './userReducer';

const allReducers = {
  userReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;