import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'brainic-frontend',
  webDir: 'dist/brainic-frontend',
  server: {
    androidScheme: 'https'
  }
};

export default config;
