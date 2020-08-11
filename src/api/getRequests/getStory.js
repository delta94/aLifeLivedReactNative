import {axiosGetWithAuth} from './../axiosWithAuth';

export const getStoryByID = async (id) => {
  try {
    const response = await axiosGetWithAuth(`/story/${id}`)
    return response.data
  } catch (error) {
    console.log(error);
    return {
      error,
      errorMessage: error.response.data.message
    }
  }
};
