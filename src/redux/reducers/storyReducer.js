import { SAVE_STORY_DETAILS, SAVE_ALL_TAGS } from './../actions/allActions';


const storyDefaultState = {
  interviewer: "",
  interviewee: "",
  title: "",
  description: "",
  isPublic: false,
  isSelfInterview: false,
  profileImageURL: "",
  selectedTags: [],
  allTags: []
};

const storyReducer = (state = storyDefaultState, action) => {
  switch (action.type) {
    case SAVE_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload.data
      }
    default:
      return state;
  }
};

export default storyReducer;