// API
import {finaliseStream} from './../api/postRequests/audioStream';
import { createResponse } from './../api/postRequests/response';

export const finaliseStreamAndCreateResponse = async (questionID) => {
  const streamData = await finaliseStream();
  let audioFileURL = streamData.Location;

  // IF there is no recording then it won't fire a response to server. 
  if (audioFileURL) {
    const response = await createResponse(audioFileURL, questionID);
    return response.data.encryptedID;
  }
};