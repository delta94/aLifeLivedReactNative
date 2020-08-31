import {axiosGetWithAuth} from './../axiosWithAuth';

export const getUserByID = async (id) => {
  try {
    const response = await axiosGetWithAuth(`/users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserStories = async (id) => {
  try {
    const response = await axiosGetWithAuth(`/users/userstories/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}