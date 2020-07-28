import { SAVE_STORY_DETAILS } from './allActions';

export const saveStoryDetails = (data) => {
  return {
    type: SAVE_STORY_DETAILS,
    payload: {data}
  }
};

