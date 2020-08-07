import { SAVE_STORY_DETAILS, SAVE_ALL_TAGS, SAVE_RESPONSE } from './../actions/allActions';


const storyDefaultState = {
  interviewer: "",
  interviewee: "",
  title: "",
  description: "",
  isPublic: false,
  isSelfInterview: false,
  profileImageURL: "",
  selectedTags: [],
  responses: [],
  allTags: []
};

const storyReducer = (state = storyDefaultState, action) => {
  switch (action.type) {
    case SAVE_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload.data
      }
    case SAVE_RESPONSE:
      return {
        ...state,
        responses: [...state.responses, action.payload.response.id]
      }
    default:
      return state;
  }
};

export default storyReducer;