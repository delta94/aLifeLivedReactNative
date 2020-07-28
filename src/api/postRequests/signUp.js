import { axiosAPI } from './../axiosWithAuth';

export const signUp = async ({firstName, lastName, emailAddress, mobileNumber, username, password, avatarURL}) => {  
  try {
    const data = await axiosAPI.post('/signup', {
      firstName,
      lastName, 
      emailAddress,
      mobileNumber,
      username,
      password,
      avatarURL
    });

    return data;
  } catch (error) {   
    return {
      error,
      errorMessage: error.response.data.message
    };
  }
};