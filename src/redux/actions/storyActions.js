import { SAVE_STORY_DETAILS, SAVE_ALL_TAGS } from './allActions';

export const saveStoryDetails = (data) => {
  return {
    type: SAVE_STORY_DETAILS,
    payload: {data}
  }
};

export const saveAllTags = (data) => {
  return {
    type: SAVE_ALL_TAGS,
    payload: {data}
  }
};




