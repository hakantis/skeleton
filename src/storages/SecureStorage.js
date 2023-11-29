import * as SecureStore from 'expo-secure-store';

// key (string)- value pair for saving into storage
export const setSecureStorageData = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    // saving error
  }
};

// key (string) for getting the value from storage
export const getSecureStorageData = async (key) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    return result != null ? JSON.parse(result) : null;
  } catch (e) {
    // error reading value
  }
};