import {USER_LOGIN_SUCCESSFUL, SET_USER_TOKEN, REMOVE_USER_TOKEN} from './allActions';

export const userLoginSuccessful = (userData) => {
  return {
    type: USER_LOGIN_SUCCESSFUL,
    payload: {userData}
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