import { SAVE_ALL_STORIES, SAVE_NEW_STORY } from './../actions/allActions';

const allCollectionsDefaultState = {
  stories: [
    {
      description: "",
      id: "",
      intervieweeName: "",
      responseAudioFile: "",
      interviewer: {
        id: "",
        avatarURL: "",
        firstName: "",
        lastName: "",
        userName: ""
      },
      isSelfInterview: false,
      likes: 0,
      tags: [],
      title: "",
    }
  ]
};

const allCollectionsReducer = (state = allCollectionsDefaultState, action) => {
  switch (action.type) {
    case SAVE_ALL_STORIES:
      return {
        ...state, 
        stories: action.payload
      }
    case SAVE_NEW_STORY:
      state.stories.push(action.payload);
      return {
        ...state
      }
      default:
      return state;
  }
};

export default allCollectionsReducer;