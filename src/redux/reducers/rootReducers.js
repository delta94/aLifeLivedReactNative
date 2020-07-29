import {combineReducers} from 'redux';

// Individual Reducers
import userReducer from './userReducer';
import storyReducer from './storyReducer';
import questionReducer from './questionReducer';
import recorderReducer from './recorderReducer';

const allReducers = {
  userReducer,
  storyReducer,
  questionReducer,
  recorderReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;