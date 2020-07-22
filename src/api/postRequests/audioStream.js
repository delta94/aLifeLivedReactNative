import {axiosAPI} from './../axiosWithAuth';
import {S3_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY} from 'react-native-dotenv';
const AWS = require('aws-sdk');
import {Buffer} from 'buffer';
import { modulo } from 'react-native-reanimated';
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: S3_BUCKET_NAME,
});
let uploadId, partNum, filename, partResponses;
let packetCount, superPac;;
const SUPERPAC_SIZE = 2600;



export const initialiseStream = async (fn) => {
  console.log(`initialiseStream(${fn})`);
  filename = fn;
  packetCount = 0;
  superPac = [];
  partNum = 1;
  partResponses = [];
};

export const audioStream = async (chunkData) => {
  try {
      superPac.push(chunkData);
    packetCount++;
    if (packetCount % 100 === 0)
      console.log('packetCount ', packetCount);
    if (packetCount == SUPERPAC_SIZE) {
      console.log('superPac');
      if (partNum === 1) {
        // 
        console.log('createMultipartUpload');
        const result = await s3.createMultipartUpload({Key: filename, Bucket: S3_BUCKET_NAME}).promise();
        uploadId = result.UploadId;
        console.log(result);
      }
      s3PartUpload();
    }
  }
    catch (error) {
      console.log(error);
    }
};

const s3PartUpload = async () => {
  try {
    console.log(`s3PartUpload ${partNum} with superPac.length ${superPac.length}, packetCount ${packetCount}`);
    const superPacked = Buffer.concat(superPac);
    packetCount = 0;
    superPac = [];
    console.log(`superPacked byte length ${Buffer.byteLength(superPacked)}`);
    const result = await s3.uploadPart({
      Key: filename, 
      Bucket: S3_BUCKET_NAME,
      Body: superPacked,
      //ContentType: 'audio/vnd.wav',
      UploadId: uploadId,
      PartNumber: partNum
    }).promise();
    console.log(result);
    partResponses.push({ETag: result.ETag, PartNumber: partNum});
    partNum++;
  } catch (error) {
    console.log(error);
  }
}



export const finaliseStream = async () => {
  try {
    console.log('finaliseStream() with partNum', partNum);
    if (partNum === 1) {
      // whole stream is less than 5MB (min part size) -- upload the whole stream via s3putObject
      console.log('putObject() with superPac.length ', superPac.length, 'packetCount ', packetCount);
      const packed = Buffer.concat(superPac);
      console.log(`packed byte length ${Buffer.byteLength(packed)}`);
      const result = await s3.putObject({
        Key: filename, 
        Body: packed,
        Bucket: S3_BUCKET_NAME,
      }).promise();
      console.log(result);
    }
    else {
      await s3PartUpload();
      console.log('completeMultipartUpload() with partResponses ', partResponses);
      const result = await s3.completeMultipartUpload({
        Key: filename, 
        UploadId: uploadId,
        Bucket: S3_BUCKET_NAME,
        MultipartUpload: { Parts: partResponses }
      }).promise();
      console.log(result);
    }
  } catch (error) {
      console.log(error);
  }
}