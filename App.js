import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import BackgroundService from 'react-native-background-actions';
import RNShake from 'react-native-shake';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './SRC/Screens/SplashScreen';
import {persistor, store} from './SRC/Store';
import AppNavigator from './SRC/appNavigation';
import {
  Alert,
  AppState,
  NativeEventEmitter,
  DeviceEventEmitter,
  NativeModules,
  PermissionsAndroid,
  DevSettings,
  Platform,
  Linking,
  ToastAndroid,
} from 'react-native';
import {
  audioPermission,
  requestAudoRecordPermission,
  requestCameraPermission,
  requestContactsPermission,
  requestForegroundPermissions,
  requestLocationPermission,
  requestNotificationPermission,
  requestSensorPermission,
  requestSmsPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import moment from 'moment';
import mobileSms from 'react-native-mobile-sms';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  setAppIsInBackground,
  setBackgroundEnabled,
  setLocation,
  setRecordings,
} from './SRC/Store/slices/common';
import GetLocation from 'react-native-get-location';
import Home from './SRC/Screens/Home';

const {ShakeModule} = NativeModules;
const shakeEventEmitter = new NativeEventEmitter(ShakeModule);
const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainContainer />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};
const audioRecorderPlayer = new AudioRecorderPlayer();

const MainContainer = () => {
  const [currentState, setCurrentState] = useState('active');
  console.log('🚀 ~ MainContainer ~ currentState:', currentState);

  const dispatch = useDispatch();

  useEffect(() => {
    async function GetPermission() {
      console.log('AUDIO PERMSIISON');
      await requestLocationPermission();
      await requestContactsPermission();
      await requestForegroundPermissions();  
      await requestCameraPermission();
      await requestNotificationPermission();
      await requestSmsPermission();
      await audioPermission();
      await requestWritePermission();
    }

    GetPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  // return <AppNavigator/>
  return <AppNavigator />;
  // return <Home/>
};

export default App;

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(8000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
