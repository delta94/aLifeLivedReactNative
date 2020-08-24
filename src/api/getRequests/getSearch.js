import { axiosAPI } from './../axiosWithAuth';

export const getSearchResults = async (search) => {
  try {
    const data = await axiosAPI.get(`/search/?search=${search}`);
    return data;
  } catch (error) {
    return error;
  };
};