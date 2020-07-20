import {axiosAPI} from './../axiosWithAuth';
import {S3_BUCKET_NAME} from 'react-native-dotenv';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
let uploadId, partNum, filename, partResponses;

export const initialiseStream = async (fn) => {
  filename = fn;
  const result = await s3.createMultipartUpload({Key: filename, Bucket: S3_BUCKET_NAME}).promise();
  uploadId = result.UploadId;
  partResponses = [];
  partNum = 1;
}

export const audioStream = async (chunkData) => {
  try {
    const result = await s3.uploadPart({
      Key: filename, 
      Bucket: S3_BUCKET_NAME,
      Body: chunkData,
      ContentType: 'audio/vnd.wav',
      UploadId: uploadId,
      PartNumber: partNum++
    }).promise();
    partResponses.push({Etag: result.Etag, PartNumber: partNum});
    partNum++;
  } catch (error) {
    console.log(error)
  }
};

export const finaliseStream = async () => {
  const result = await s3.completeMultipartUpload({
    Key: filename, 
    UploadId: uploadId,
    Bucket: S3_BUCKET_NAME,
    MultipartUpload: { Parts: partResponses }
  }).promise();
  uploadId = result.UploadId;
  partNum = 1;
}