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
      console.log(action.payload.storyData);
      const userID = action.payload.storyData.userID;
      const interviewee = action.payload.storyData.interviewee;
      const storyTitle = action.payload.storyData.storyTitle;
      const storyAbout = action.payload.storyData.storyAbout;
      const storyDescription = action.payload.storyData.storyDescription;
      const isStoryPrivate = action.payload.storyData.isStoryPrivate;
      const isSelfInterview = action.payload.storyData.isSelfInterview;
      const selectedTags = action.payload.storyData.selectedTags;

      return {
        ...state,
        interviewer: userID,
        interviewee: interviewee,
        title: storyTitle,
        about: storyAbout,
        description: storyDescription,
        isStoryPrivate: isStoryPrivate,
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