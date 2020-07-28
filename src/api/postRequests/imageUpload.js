import {axiosAPI} from './../axiosWithAuth';


export const imageUpload = async (formData) => {
  const config = {
    headers: {
      Accept: "application/json",
        'content-type': 'multipart/form-data'
    }
  };

  try {
    const response = axiosAPI.post("/upload/profileimage", formData, config);
    return response;
  } catch (error) {
    console.log(error);
  }
}