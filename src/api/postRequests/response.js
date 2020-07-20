import {axiosPostWithAuth} from './../axiosWithAuth';

export const createResponse = async (audioFileURL, questionID) => {
  try {
    const data = await axiosPostWithAuth("/response", {
      audioFileURL,
      questionID
    });
  } catch (error) {
    console.log(error)
  }
};