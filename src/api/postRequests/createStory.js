import {axiosPostWithAuth} from './../axiosWithAuth';

export const createStory = async (storyData) => {
  try {
    const data = await axiosPostWithAuth('/story', {
      storyData
    });
    
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: error
    }
  }
};