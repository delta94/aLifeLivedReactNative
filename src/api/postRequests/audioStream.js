import {axiosAudioAPI} from './../axiosWithAuth';
import {Buffer} from 'buffer';
import {AUDIO_API_BASE_ROUTE} from 'react-native-dotenv';

let channelId, chunkNum, chunkResponses, uploadChunkPromise, packets;

const PACKETS_TO_CHUNK = 100; // chunk RAM size == 2kB x PACKETS_TO_CHUNK

//  This should be called as soon as the screen is displayed to the user.
//  It should be called once only.
export const initialiseStream = async (userId) => {
  try {
    console.log(`initialiseStream()`);
    packets = [];
    chunkNum = 1;
    chunkResponses = [];
    console.log(userId);
    const response = await axiosAudioAPI.post("/requestChannel", {userId: userId});
    channelId = response.data.channelId;

    console.log('received channelId ', channelId);

    return channelId;
  } catch(err) {
    console.error('initialise Stream ', err);
  }
};

export const setChannelId = (chanId) => {
  channelId = chanId;
}

// This should be called by the audio recorder each time a new 2kB audio packet is available.
// packet should be provided as a Buffer. It is expected that data is raw PCA data.
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


// Should be called when user pauses recording.
// Waits for any uploading to complete, then sequences the chunks into a
// down-stream able WAV on the audio server.
// For multiple recording sessions, audio is appended to the
// pre-existing WAV file.
// Returns path to down-stream able audio
export const sequenceStream = async (chanId=channelId) => {
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
      channelId: chanId,
      chunkResponses
    });
    const streamingLink = `${AUDIO_API_BASE_ROUTE}/${result.data.wavFilepath}`;
    console.log(streamingLink);

    // reset these to allow multiple consecutive sequencing ops on the same channel
    chunkNum = 1;
    chunkResponses = [];

    return streamingLink;
  } catch (error) {
      console.log(error);
  }
};

// Called when user leaves a screen.
// Causes up-streamed audio to be uploaded to AWS.
// All stream information is removed from the audio server.
export const finaliseStream = async (chanId=channelId) => {
  try {
    console.log('finaliseStream');
    const result = await axiosAudioAPI.post('/finaliseChannel', {
      chanId
    });
    
    return result.data;
  } catch (error) {
      console.log(error);
  }
};

export const finaliseStoryStreams = async ( storyStreams, storyId ) => {
  try {
    console.log('finaliseStoryStreams');
    const result = await axiosAudioAPI.post('/finaliseStoryStreams', {
      storyId,
      storyStreams
    });
    
    return;
  } catch (error) {
      console.log(error);
  }

}

// url mapping is determined by the structure of the audio server
export const channelIdToUrl = ( channelId ) => {
  return `${AUDIO_API_BASE_ROUTE}/channels/${channelId}/${channelId}.wav`;
}

export const audioFileIdToUrl = ( audioFileId ) => {
  return `${AUDIO_API_BASE_ROUTE}/audio/${audioFileId}.wav`;
}