import {USER_LOGIN_SUCCESSFUL, SET_USER_TOKEN, REMOVE_USER_TOKEN} from './../actions/allActions';

const userDefaultState = {
  id: null,
  loggedIn: false,
  emailAddress: "",
  isAdmin: false,
  firstName: "",
  lastName: "",
};

const userReducer = (state = userDefaultState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESSFUL:
      const userData = action.payload.userData;
      const encryptedToken = userData.encryptedToken;
      const emailAddress = userData.userData.emailAddress;
      const firstName = userData.userData.firstName;
      const lastName = userData.userData.lastName;

      return {
        ...state,
        id: encryptedToken,
        loggedIn: true,
        emailAddress: emailAddress,
        isAdmin: false,
        firstName: firstName,
        lastName: lastName
      };
    case SET_USER_TOKEN:      
      return {
        ...state,
        id: action.payload.encryptedToken
      };
    case REMOVE_USER_TOKEN: 
      return {
        id: null
      }
    default:
      return state;
  }
};

export default userReducer;