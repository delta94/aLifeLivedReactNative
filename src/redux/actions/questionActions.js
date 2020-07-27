import {
  SAVE_ALL_QUESTION,
  INCREMENT_QUESTION_INDEX,
  SET_SUB_QUESTION_ACTIVE_TRUE,
  SAVE_SUB_QUESTION,
  SET_SUB_QUESTION_INDEX,
  RESET_QUESTION_INDEX,
} from './allActions';

export const saveAllQuestions = (questions) => {
  return {
    type: SAVE_ALL_QUESTION,
    payload: {questions}
  };
};

export const saveSubQuestions = (subQuestions) => {
  return {
    type: SAVE_SUB_QUESTION,
    payload: {subQuestions}
  };
};

export const incrementQuestionIndex = () => {
  return {
    type: INCREMENT_QUESTION_INDEX,
  }
};

export const resetQuestionIndex = () => {
  return {
    type: RESET_QUESTION_INDEX
  }
};

export const setSubQuestionActiveTrue = () => {
  return {
    type: SET_SUB_QUESTION_ACTIVE_TRUE,
  };
};

export const setSubQuestionActiveFalse = () => {
  return {
    type: SET_SUB_QUESTION_ACTIVE_FALSE,
  };
}
