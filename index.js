/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import i18n from 'src/locales';

AppRegistry.registerComponent(appName, () => App);
