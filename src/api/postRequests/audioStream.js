import {axiosAudioAPI} from './../axiosWithAuth';
import {Buffer} from 'buffer';
import {AUDIO_API_BASE_ROUTE} from 'react-native-dotenv';
let channelId, chunkNum, chunkResponses, uploadChunkPromise, packets;

const PACKETS_TO_CHUNK = 100; // chunk RAM size == 2kB x PACKETS_TO_CHUNK

// this should be called as soon as the screen is displayed to the user
export const initialiseStream = async () => {
  try {

    console.log(`initialiseStream()`);
    packets = [];
    chunkNum = 1;
    chunkResponses = [];

    const response = await axiosAudioAPI.post("/requestChannel", {userId: '123'}); // TODO: send the actual userId
    channelId = response.data.channelId;

    console.log('received channelId ', channelId);
  }
  catch(err) {
    console.error('initialise Stream ', err);
  }
};

// called by the audio recorder each time a new 2kB audio packet is available
export const audioStream = async (packet) => {
  try {
    packets.push(packet);
    if (packets.length === PACKETS_TO_CHUNK) {
      uploadChunk();
    }
  }
    catch (error) {
      console.log(error);
    }
};

// called when a chunk is held in memory -- uploads to the server
const uploadChunk = async () => {
  try {
    console.log(`uploadChunk ${chunkNum} consisting of packets ${packets.length}`);
    const chunk = Buffer.concat(packets);
    packets = [];
    console.log(`chunk byte length ${Buffer.byteLength(chunk)}`);
    const chunkResponse = { chunkNum };
    chunkNum++;
    uploadChunkPromise = axiosAudioAPI.post('/uploadChunk', {channelId, chunk});
    const result = await uploadChunkPromise; // uploadChunkPromise is used to avoid a race condition in finaliseStream
    console.log('got chunkId ', result.data.chunkId);
    chunkResponse.chunkId = result.data.chunkId;
    chunkResponses.push(chunkResponse);
  } catch (error) {
    console.log(error);
  }
};


// called when user pauses recording
export const sequenceStream = async () => {
  try {
    console.log('sequenceStream() with chunkNum', chunkNum);
    // In case a prior chunk upload is still in progress, wait for it to finish
    await uploadChunkPromise;

    // Now upload the final partial chunk
    await uploadChunk();

    // sort chunkResponses by chunkNum
    chunkResponses.sort((a, b) => a.chunkNum - b.chunkNum);

    console.log('sequenceChannel() with chunkResponses ', chunkResponses);
    const result = await axiosAudioAPI.post('/sequenceChannel',
    {
      channelId,
      chunkResponses
    });
    console.log(`streaming link: ${AUDIO_API_BASE_ROUTE}/${result.data.wavFilepath}`);

    // reset these to allow multiple consecutive sequencing ops on the same channel
    chunkNum = 1;
    chunkResponses = [];

  } catch (error) {
      console.log(error);
  }
};

// called when user leaves a screen
export const terminateStream = async () => {
  try {
    console.log('terminateStream');
    const result = await axiosAudioAPI.post('/terminateChannel',
    {
      channelId
    });
    console.log('got result ', result);
  } catch (error) {
      console.log(error);
  }
};