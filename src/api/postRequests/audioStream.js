import {axiosAPI} from './../axiosWithAuth';

export const audioStream = async (chunkData) => {
  try {
    const data = await axiosAPI.post('/audio', {
      chunkData
    });
  } catch (error) {
    console.log(error)
  }
};