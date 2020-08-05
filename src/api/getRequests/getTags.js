import {axiosGetWithAuth} from './../axiosWithAuth';

export const getAllTags = async () => {
  try {
    const response = await axiosGetWithAuth('/tag');
    return response;
  } catch (error) {
    console.log(error);
    return {
      message: error
    };
  }
}