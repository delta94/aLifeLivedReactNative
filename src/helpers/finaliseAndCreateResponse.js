// API
import {finaliseStream} from './../api/postRequests/audioStream';
import { createResponse } from './../api/postRequests/response';

export const finaliseStreamAndCreateResponse = async (questionID) => {
  const streamData = await finaliseStream();
  let audioFileURL = streamData.Location;
  const response = await createResponse(audioFileURL, questionID);
  return response.data.encryptedID;
};