import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    const token = AsyncStorage.getItem(`${this.namespace}:token`);
    return token;
  }

  setAccessToken(accessToken) {
    // Add the access token to the storage
    AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  }

  removeAccessToken() {
    // Remove the access token from the storage
    AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;