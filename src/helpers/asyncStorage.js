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