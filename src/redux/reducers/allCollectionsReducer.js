import { SAVE_ALL_STORIES } from './../actions/allActions';

const allCollectionsDefaultState = {
  stories: [
    {
      description: "",
      id: "",
      intervieweeName: "",
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
    default:
      return state;
  }
};

export default allCollectionsReducer;