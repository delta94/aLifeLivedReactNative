import {axiosPostWithAuth} from './../axiosWithAuth';

export const createStory = async (storyData) => {
  try {
    const response = await axiosPostWithAuth('/story', {
      storyData
    });
    
    return response.data.storyID;
  } catch (error) {
    console.log(error);
    return {
      error: error
    }
  }
};