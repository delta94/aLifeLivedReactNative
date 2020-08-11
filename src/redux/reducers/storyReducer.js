import { SAVE_STORY_DETAILS, SAVE_ALL_TAGS, SAVE_RESPONSE, RESET_STORY_REDUCER } from './../actions/allActions';

const storyDefaultState = {
  interviewer: "",
  interviewee: "",
  title: "",
  description: "",
  about: "",
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
        responses: [...state.responses, action.payload.responseID]
      }
    case SAVE_STORY_DETAILS: 
      const interviewer = action.payload.storyData.interviewer;
      const interviewee = action.payload.storyData.interviewee;
      const title = action.payload.storyData.title;
      const about = action.payload.storyData.about;
      const description = action.payload.storyData.description;
      const isPublic = action.payload.storyData.isPublic;
      const isSelfInterview = action.payload.storyData.isSelfInterview;
      const selectedTags = action.payload.storyData.selectedTags;

      return {
        ...state,
        interviewer: interviewer,
        interviewee: interviewee,
        title: title,
        about: about,
        description: description,
        isStoryPrivate: isPublic,
        isSelfInterview: isSelfInterview,
        selectedTags: selectedTags
      }
    case RESET_STORY_REDUCER:
      return storyDefaultState;
    default:
      return state;
  }
};

export default storyReducer;