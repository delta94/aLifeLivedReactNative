import {combineReducers} from 'redux';

// Individual Reducers
import userReducer from './userReducer';
import storyReducer from './storyReducer';
import questionReducer from './questionReducer';

const allReducers = {
  userReducer,
  storyReducer,
  questionReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;