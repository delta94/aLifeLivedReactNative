import {
  USER_LOGIN_SUCCESSFUL,
  SET_USER_TOKEN,
  REMOVE_USER_TOKEN,
  REMOVE_LIKED_STORY,
  REMOVE_BOOKMARKED_STORY,
  ADD_LIKED_STORY,
  ADD_BOOKMARKED_STORY,
  RETURN_USER_REDUCER_TO_DEFAULT_STATE,
} from './allActions';

export const userLoginSuccessful = (userData, authToken) => {
  return {
    type: USER_LOGIN_SUCCESSFUL,
    payload: {userData, authToken}
  };
};

export const setUserToken = (encryptedToken) => {  
  return {
    type: SET_USER_TOKEN,
    payload: {encryptedToken},
  };
};

export const removeUserToken = () => {
  return {
    type: REMOVE_USER_TOKEN
  }
};

export const removeLikedStory = (storyID) => {
  return {
    type: REMOVE_LIKED_STORY,
    payload: storyID
  }
};

export const removeBookMarkedStory = (storyID) => {
  return {
    type: REMOVE_BOOKMARKED_STORY,
    payload: storyID
  }
};

export const addLikedStory = (storyID) => {
  return {
    type: ADD_LIKED_STORY,
    payload: storyID
  }
};

export const addBookMarkedStory = (storyID) => {
  return {
    type: ADD_BOOKMARKED_STORY,
    payload: storyID
  }
};

export const returnUserReducerToDefaultState = () => {
  return {type: RETURN_USER_REDUCER_TO_DEFAULT_STATE};
};