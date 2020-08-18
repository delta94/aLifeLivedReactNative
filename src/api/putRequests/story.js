import { axiosPutWithAuth } from './../axiosWithAuth';

export const likeStory = async (storyID, userID) => {
  try {
    const response = await axiosPutWithAuth('/story/like', {
      storyID,
      userID
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const unLikeStory = async (storyID, userID) => {
  try {
    const response = await axiosPutWithAuth('/story/unlike', {
      storyID,
      userID
    });

    return response;
  } catch (error) {
    console.log(error);
    return error; 
  }
}