import { SAVE_ALL_STORIES, SAVE_NEW_STORY } from './allActions';

export const saveAllStories = (stories) => {
  return {
    type: SAVE_ALL_STORIES,
    payload: stories
  }
};

export const saveNewStory = (stories) => {
  return {
    type: SAVE_NEW_STORY,
    payload: stories
  }
};