import { SAVE_STORY_DETAILS, SAVE_ALL_TAGS, RESET_STORY_REDUCER } from './allActions';

export const saveStoryDetails = (storyData) => {
  console.log(storyData);
  return {
    type: SAVE_STORY_DETAILS,
    payload: { storyData }
  }
};

export const saveAllTags = (data) => {
  return {
    type: SAVE_ALL_TAGS,
    payload: {data}
  }
};

export const resetStoryReducer = () => {
  return {
    type: RESET_STORY_REDUCER,
  }
}




