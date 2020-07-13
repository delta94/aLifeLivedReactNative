import {SAVE_ALL_QUESTION} from './../actions/allActions';

const questionDefaultState = {
  questions: null
};

const questionReducer = (state = questionDefaultState, action) => {
  switch (action.type) {
    case SAVE_ALL_QUESTION:
      return {
        questions: action.payload.questions
      }
    default:
      return state;
  }
};

export default questionReducer;