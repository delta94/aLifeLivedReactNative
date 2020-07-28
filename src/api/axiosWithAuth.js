import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_BASE_ROUTE_TEST, LOCAL_ENV} from 'react-native-dotenv';

let authToken;

const axiosAPI = axios.create({
  baseURL: LOCAL_ENV,
});

const retrieveAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('A_LIFE_LIVED_TOKEN');
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

module.exports = {axiosAPI, axiosGetWithAuth, axiosPostWithAuth}