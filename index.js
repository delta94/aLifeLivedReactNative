/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';
import { CODE_PUSH_STAGING_IOS_KEY, CODE_PUSH_PRODUCTION_IOS_KEY, CODE_PUSH_STAGING_ANDROID_KEY, CODE_PUSH_PRODUCTION_ANDROID_KEY} from 'react-native-dotenv';

const codePushKeys = Platform.select({
  ios: {
    STAGING: CODE_PUSH_STAGING_IOS_KEY,
    PRODUCTION: CODE_PUSH_PRODUCTION_IOS_KEY
  },
  android: {
    STAGING: CODE_PUSH_STAGING_ANDROID_KEY,
    PRODUCTION: CODE_PUSH_PRODUCTION_ANDROID_KEY
  }
})
const isBetaUser = true;

// Defines what keys are used for what env
const CodePushifiedApp = codePush({
  deploymentKey: isBetaUser ? codePushKeys.STAGING : codePushKeys.PRODUCTION,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
})(App);

AppRegistry.registerComponent(appName, () => CodePushifiedApp);