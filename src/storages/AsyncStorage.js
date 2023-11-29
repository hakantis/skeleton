import AsyncStorage from '@react-native-async-storage/async-storage';

// key (string)- value pair for saving into storage
export const setAsyncStorageData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

// key (string) for getting the value from storage
export const getAsyncStorageData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};