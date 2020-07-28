import { SAVE_STORY_DETAILS } from './../actions/allActions';


const storyDefaultState = {
  interviewer: "",
  interviewee: "",
  title: "",
  description: "",
  isPublic: false,
  isSelfInterview: false,
  profileImageURL: ""
};

const storyReducer = (state = storyDefaultState, action) => {
  switch (action.type) {
    case SAVE_STORY_DETAILS:
  
      break;
    default:
      return state;
  }
};

export default storyReducer;