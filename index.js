/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';
import Config from "react-native-config";

const codePushKeys = Platform.select({
  ios: Config.CODE_PUSH_IOS_KEY,
  android: Config.CODE_PUSH_ANDROID_KEY
});


// Defines what keys are used for what env
const CodePushifiedApp = codePush({
  deploymentKey: codePushKeys,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
})(App);

AppRegistry.registerComponent(appName, () => CodePushifiedApp);