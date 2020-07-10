import {SAVE_ALL_QUESTION} from './../actions/allActions';

const questionDefaultState = {
  audioFileURL: "",
  id: "",
  isMasterQuestion: false,
  isYesOrNo: false,
  order: 0,
  subQuestions: [],
  suggestions: [],
  title: ""
};

const questionReducer = (state = questionDefaultState, action) => {
  switch (action.type) {
    case SAVE_ALL_QUESTION:

    default:
      break;
  }
};