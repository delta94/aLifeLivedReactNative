import {SAVE_ALL_QUESTION} from './allActions';

export const saveAllQuestions = (questions) => {
  return {
    type: SAVE_ALL_QUESTION,
    payload: (questions)
  };
};