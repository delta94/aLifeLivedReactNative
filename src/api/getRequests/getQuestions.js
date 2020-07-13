import {axiosGetWithAuth} from './../axiosWithAuth';

export const getAllQuestions = async () => {
  try {
    const response = await axiosGetWithAuth('/question');
    return response;
  } catch (error) {
    return {
      error,
      errorMessage: error.response.data.message,
    };
  }
};