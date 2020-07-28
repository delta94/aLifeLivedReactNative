import {
  SAVE_ALL_QUESTION,
  INCREMENT_QUESTION_INDEX,
  RESET_QUESTION_INDEX,
  SAVE_SUB_QUESTION,
  SET_SUB_QUESTION_ACTIVE_FALSE,
  SET_SUB_QUESTION_ACTIVE_TRUE,
} from './../actions/allActions';

const questionDefaultState = {
  questions: null,
  questionIndex: 0,
  subQuestionActive: false,
  subQuestions: null,
  subQuestionIndex: null
};

const questionReducer = (state = questionDefaultState, action) => {
  switch (action.type) {
    case SAVE_ALL_QUESTION:
      return {
        ...state,
        questions: action.payload.questions,
      }
    case SAVE_SUB_QUESTION:
      return {
        ...state,
        subQuestions: action.payload.subQuestions
      };
    case SET_SUB_QUESTION_ACTIVE_FALSE: 
      return {
        ...state,
        subQuestionActive: false
      }
    case SET_SUB_QUESTION_ACTIVE_TRUE:
      return {
        ...state,
        subQuestionActive: true
      }
    case INCREMENT_QUESTION_INDEX:
      return { 
        ...state,
        questionIndex: state.questionIndex + 1
      }
    case RESET_QUESTION_INDEX:
      return {
        ...state,
        questionIndex: 0
      }
    default:
      return state;
  }
};

export default questionReducer;