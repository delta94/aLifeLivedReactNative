import {axiosPostWithAuth} from './../axiosWithAuth';

export const createStory = async (storyData) => {
  try {
    const response = await axiosPostWithAuth('/story', {
      storyData
    });
    
    console.log(response.data.storyID);
    return response.data.storyID;
  } catch (error) {
    console.log(error);
    return {
      error: error
    }
  }
};