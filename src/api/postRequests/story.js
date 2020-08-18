import { axiosPostWithAuth, axiosPutWithAuth } from './../axiosWithAuth';

export const likeStory = async (storyID, userID) => {
  try {
    const response = await axiosPostWithAuth('/story/like', {
      storyID,
      userID
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};