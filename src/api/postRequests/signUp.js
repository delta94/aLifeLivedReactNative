import { axiosAPI } from './../axiosWithAuth';

export const signUp = async (emailAddress, password, username, mobileNumber) => {

  try {
    const data = await axiosAPI.post('/login', {
      emailAddress,
      password,
      username, 
      mobileNumber
    });

    return data;
  } catch (error) {
    return {
      error,
      errorMessage: error.response.data.message
    };
  }
};