import { SAVE_ALL_STORIES } from './allActions';

export const saveAllStories = (stories) => {
  return {
    type: SAVE_ALL_STORIES,
    payload: stories
  }
};