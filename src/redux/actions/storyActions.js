import { SAVE_STORY_DETAILS, SAVE_ALL_TAGS, SAVE_RESPONSE } from './allActions';

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

export const saveResponse = (response) => {
  return {
    type: SAVE_RESPONSE,
    payload: {response}
  }
}




