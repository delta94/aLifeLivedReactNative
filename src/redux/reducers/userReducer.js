import {USER_LOGIN_SUCCESSFUL} from './../actions/allActions';

const userDefaultState = {
  id: "",
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
    default:
      return state;
  }
};

export default userReducer;