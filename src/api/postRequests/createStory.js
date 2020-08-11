import {axiosPostWithAuth} from './../axiosWithAuth';

export const createStory = async (storyData) => {
  try {
    const data = await axiosPostWithAuth('/story', {
      storyData
    })
  } catch (error) {
    console.log(error);
    return {
      error: error
    }
  }
};