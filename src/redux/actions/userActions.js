import {USER_LOGIN_SUCCESSFUL} from './allActions';

export const userLoginSuccessful = (userData) => {
  return {
    type: USER_LOGIN_SUCCESSFUL,
    payload: {userData}
  };
};