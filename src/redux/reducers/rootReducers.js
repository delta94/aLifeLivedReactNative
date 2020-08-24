import {combineReducers} from 'redux';

// Individual Reducers
import userReducer from './userReducer';
import storyReducer from './storyReducer';
import questionReducer from './questionReducer';
import recorderReducer from './recorderReducer';
import allCollectionsReducer from './allCollectionsReducer';

const allReducers = {
  userReducer,
  storyReducer,
  questionReducer,
  recorderReducer,
  allCollectionsReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;