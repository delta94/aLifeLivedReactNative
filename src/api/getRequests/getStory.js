import {axiosGetWithAuth, axiosAPI} from './../axiosWithAuth';

export const getStoryByID = async (id) => {
  try {
    const response = await axiosGetWithAuth(`/story/${id}`)
    return response;
  } catch (error) {
    console.log(error);
    return {
      error,
      errorMessage: error.response.data.message
    }
  }
};

export const getAllPublicStories = async () => {
  try {
    const response = await axiosAPI('/story');
    return response;
  } catch (error) {
    console.log(error);
    return {
      errorMessage: error.response.data.message
    }
  }
};
