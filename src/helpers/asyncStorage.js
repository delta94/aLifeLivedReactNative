import AsyncStorage from '@react-native-community/async-storage';

export const storeToken = async (data) => {
  try {
    const item = await AsyncStorage.setItem('A_LIFE_LIVED_TOKEN', data);
    return item;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const getToken = async () => {
  try {
    const encryptedToken = await AsyncStorage.getItem("A_LIFE_LIVED_TOKEN");
    return encryptedToken;
  } catch (error) {
    console.log(error);
    return error;
  }
};