declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    RSA_KEY?: string;
    MERCHANTID_DEV?: number;
    MERCHANTSHAREKEY_DEV?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
