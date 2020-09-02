import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BACKEND_BASE_ROUTE_TEST, AUDIO_SERVER_ROUTE_TEST
} from 'react-native-dotenv';
import {TOKEN_IDENTIFIER} from './../appConstants';
import {Platform} from 'react-native';

let authToken;

const axiosAPI = axios.create({
  baseURL: BACKEND_BASE_ROUTE_TEST,
});

const axiosAudioAPI = axios.create({
  baseURL: AUDIO_SERVER_ROUTE_TEST,
});

const retrieveAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_IDENTIFIER);
  } catch (err) {
    console.log('Unable to retrieve auth token from Async Storage ', err);
  }
};

const axiosPostWithAuth = async (api, params) => {
  try {
    if (!authToken) {
      authToken = await retrieveAuthToken();
    }
    if (!authToken) throw 'unable to retrieve auth token';
    const options = {
      headers: {Authorization: authToken},
    };

    return axiosAPI.post(api, params, options);
  } catch (err) {
    console.log(`axiosPostWithAuth err ${err}`);
  }
};

const axiosPutWithAuth = async (api, params) => {
  try {
    if (!authToken) {
      authToken = await retrieveAuthToken();
    }
    if (!authToken) throw 'unable to retrieve auth token';
    const options = {
      headers: { Authorization: authToken },
    };

    return axiosAPI.put(api, params, options);
  } catch (error) {
    console.log(`axiosPostWithAuth err ${err}`);
  }
};

const axiosGetWithAuth = async (api) => {
  try {
    if (!authToken) {
      authToken = await retrieveAuthToken();
    }
    if (!authToken) throw 'unable to retrieve auth token';
    const options = {
      headers: {Authorization: authToken},
    };
    return axiosAPI.get(api, options);
  } catch (err) {
    console.log(`axiosGetWithAuth err ${err}`);
  }
};

module.exports = { axiosAPI, axiosAudioAPI, axiosGetWithAuth, axiosPostWithAuth, axiosPutWithAuth}