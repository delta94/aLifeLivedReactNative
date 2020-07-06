import {combineReducers} from 'redux';

// Individual Reducers
import userReducer from './userReducer';
import storyReducer from './storyReducer';

const allReducers = {
  userReducer,
  storyReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;