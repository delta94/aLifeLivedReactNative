import { axiosPutWithAuth } from './../axiosWithAuth';

export const bookMarkStory = async (storyID, userID) => {
  try {
    const response = await axiosPutWithAuth('/users/bookmark', {
      storyID,
      userID
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}; 

export const unBookMarkStory = async (storyID, userID) => {
  try {
    const response = await axiosPutWithAuth('/users/unbookmark', {
      storyID,
      userID
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};