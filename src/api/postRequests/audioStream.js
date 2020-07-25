import {axiosAPI, axiosAudioAPI} from './../axiosWithAuth';
import {S3_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY} from 'react-native-dotenv';
const AWS = require('aws-sdk');
import {Buffer} from 'buffer';
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: S3_BUCKET_NAME,
});
let channelId, chunkNum, chunkResponses;
let packets;
const PACKETS_TO_CHUNK = 200;



export const initialiseStream = async () => {
  try {
    console.log(`initialiseStream()`);
    const response = await axiosAudioAPI.post("/requestChannel");
    
    channelId = response.channelId;

    console.log('received channelId ', channelId);

    packets = [];
    chunkNum = 1;
    chunks = [];
  }
  catch(err) {
    console.error('initialise Stream ', err);
  }
};

export const audioStream = async (packet) => {
  try {
    packets.push(packet);
    if (packets.length % 10 === 0)
      console.log('packets length ', packets.length);
    if (packets.length === PACKETS_TO_CHUNK) {
      console.log('lets call it a chunk');
      uploadChunk();
    }
  }
    catch (error) {
      console.log(error);
    }
};

const uploadChunk = async () => {
  try {
    console.log(`uploadChunk ${chunkNum} consisting of packets ${packets.length}`);
    const chunk = Buffer.concat(packets);
    packets = [];
    console.log(`chunk byte length ${Buffer.byteLength(chunk)}`);
    const result = await axiosAudioAPI.post({channelId, chunk});
    console.log(result);
    chunkResponses.push({chunkNum, chunkId: result.chunkId});
    chunkNum++;
  } catch (error) {
    console.log(error);
  }
}



export const finaliseStream = async () => {
  try {
    console.log('finaliseStream() with chunkNum', chunkNum);
    // TODO: if a prior partUload is still underway, need to wait for it to completew to avoid conflict
    await uploadChunk();
    console.log('finaliseChannel() with chunkResponses ', chunkResponses);
    const result = await axiosAudioAPI.post('/finaliseChannel',
    {
      channelId,
      chunkResponses
    });
    console.log(result);
  } catch (error) {
      console.log(error);
  }
}