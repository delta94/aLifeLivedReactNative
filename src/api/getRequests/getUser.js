import {axiosGetWithAuth} from './../axiosWithAuth';

export const getUserByID = async (id) => {
  console.log(id);
  try {
    const response = await axiosGetWithAuth(`/users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}