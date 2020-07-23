import {axiosGetWithAuth} from './../axiosWithAuth';

export const getSubQuestionFromQuestionID = async (id) => {
  try {
    const response = await axiosGetWithAuth(`subquestions/question/${id}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};