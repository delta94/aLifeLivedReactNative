import {axiosAPI} from './../axiosWithAuth';

export const login = async (emailAddress, password) => {
  try {
    const data = await axiosAPI.post('/login', {
      emailAddress,
      password,
    });
   
    return data;
  } catch (error) {
    return {
      error,
      errorMessage: error.response.data.message
    }
  };
};