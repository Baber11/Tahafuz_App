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
  ToastAndroid
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
import { setAppIsInBackground, setBackgroundEnabled, setLocation, setRecordings } from './SRC/Store/slices/common';

const { ShakeModule } = NativeModules;
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
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentState, setCurrentState] = useState('active');
  console.log('🚀 ~ MainContainer ~ currentState:', currentState);
 
  const dispatch = useDispatch();

  const _handleAppStateChange = async nextAppState => {
    console.log('🚀 ~ MainContainer ~ nextAppState:', nextAppState);
    console.log('App state changed:', nextAppState);

    if (nextAppState === 'active') {
      dispatch(setAppIsInBackground(false))
      // Stop recording if the app is reopened
      if (isRecording) {
        await audioRecorderPlayer.stop();
      }
      // setCurrentState(nextAppState);
    } else if (nextAppState.match(/inactive|background/)) {
      setCurrentState(nextAppState);
      // toggleBackground();
      dispatch(setAppIsInBackground(true))
    }
    // if (nextAppState === 'active') {
    //   dispatch(Onbackground(false));
    // } else
    //   currentState.match(/inactive|background/) && nextAppState === 'active';
    // setCurrentState(nextAppState);
  };

  const options = {
    taskName: 'Recprder Running',
    taskTitle: 'Background Recorder',
    taskDesc: 'Recording your voice in background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'myapp',
    parameters: {
      delay: 30000,
    },
  };

  BackgroundService.on('expiration', () => {
    console.log('IOS : i am being closed ');
  });

  let playing = BackgroundService.isRunning();

  console.log('🚀 ~ MainContainer ~ playing:', playing);

  BackgroundService.on('expiration', () => {
    console.log('IOS : i am being closed ');
  });
  const startRecording = async () => {
    audioRecorderPlayer.removeRecordBackListener();
    try {
      await audioRecorderPlayer.stopRecorder();
      const result = await audioRecorderPlayer.startRecorder();
      console.log('Recording started:', result);
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordingDuration(e.currentPosition);
        console.log('🚀 ~ startRecording ~ e:', e.currentPosition);
      });

      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recorder:', error);
    }
  };

  const stopRecording = async () => {
    // console.log(recordingDuration);
    try {
      audioRecorderPlayer.removeRecordBackListener();
      const result = await audioRecorderPlayer.stopRecorder();
      console.log('Recording stopped:', result);
      setRecordedFilePath(result);
      setIsRecording(false);
      const durationt = moment.duration(recordingDuration, 'milliseconds');

      const date = new Date();
      const formattedDate = moment(date).format('DD/MM/YYYY');
      const audioFileObject = {
        id: Date.now().toString(),
        audioFile: result,
        duration: moment.utc(durationt.asMilliseconds()).format('mm:ss'),
        date: formattedDate,
      };

      dispatch(setRecordings(audioFileObject));
    } catch (error) {
      console.error('Error stopping recorder:', error);
    }
  };
  const backgroundActions = async taskData => {
    console.log('functione me bhi agaya ha');
    const {delay} = taskData;
// Listen for shake events
const shakeEventEmitter = new NativeEventEmitter(ShakeModule);
let i =0;
const shakeSubscription = shakeEventEmitter.addListener('ShakeEvent', () => {
  console.log('Shake detected in background!');
  // Alert.alert('Shake Detected!', 'You shook the device in the background.');
console.log("first", i++)
  // Your background logic here (e.g., start recording, send a message, etc.)
  // startRecording();
  // setTimeout(() => {
  //   stopRecording();
  //   const mobileNumber = '+923172112995';
  //   const message = 'Kese ho?';
  //   mobileSms
  //     .sendDirectSms(mobileNumber, message)
  //     .then((response) => {
  //       console.log('Message sent successfully:', response);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to send message:', error);
  //     });
  // }, 10000);
});

// Keep the background task alive
await new Promise(()=>{});

// Clean up on background task end
return () => {
  shakeSubscription.remove();
  ShakeModule.stopListening();
  console.log('Background task ended.');
};

    // if (
    //   await PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    //   )
    // ) {

    //   await startRecording();
    //   setTimeout(() => {
    //     stopRecording();
    //     // const mobileNumber = '+923292297354';
    //     // const mobileNumber = '+923122032631';
    //     const mobileNumber = '+923172112995';
    //   const message = `Kese ho?`;
    //       mobileSms.sendDirectSms(mobileNumber, message)
    //   .then((response) => {
    //     console.log("Check you success Messages :",response);
    //   })
    //   .catch((error) => {
    //     console.log("Check you Error Message :",error);
    //   })
    //   // console.log(result)
          
    //   }, 10000);
    // } else {
    //   await audioPermission();
    // }

    // await new Promise(r => setTimeout(r, delay));
  };
  // shakeEventEmitter.addListener('ShakeEvent', () => {
  //   console.log('Device shaken!');
  //   alert('Device shaken!');
  // });
  //   useEffect(() => {
  //    requestSensorPermission();
  //    console.log("inside  Shaken device")
  
  //     const shakeEventEmitter = new NativeEventEmitter(ShakeModule);
  // console.log(shakeEventEmitter)
  //     // Add the shake event listener
  //     const subscription = shakeEventEmitter.addListener('ShakeEvent', () => {
  //      console.log("Shaken device")
  //       Alert.alert('Shake Detected!', 'You shook the device.');
  //     });
  
  //     // Start listening for shake gestures
  //     ShakeModule.startListening();
  
  //     // Cleanup function to stop listening and remove the event listener
  //     return () => {
  //       ShakeModule.stopListening();
  //       subscription.remove();
  //     };
  //   }, []);
  // useEffect(() => {
  //    requestSensorPermission();

  //   console.log("MOUNTED SHAKE EFFECT")
  //   const shakeSubscription = RNShake.addListener(() => {
  //     Alert.alert('Shake Event Detected');
  //     console.log('Shake Detected!');
  //   });

  //   return () => {
  //     shakeSubscription.remove();
  //   };
  // }, []);

  const toggleBackground = async () => {
    console.log('yahaa a rha ha');
    if (!BackgroundService.isRunning()) {
      try {
        console.log('try me agya ha');
        await BackgroundService.start(backgroundActions, options);
        playing = true;
      } catch (error) {
        console.log(error);
      }
    } else {
      await BackgroundService.stop();
      playing = false;
    }
  };

  // useEffect(() => {

  //   // if (currentState == 'background') {
  //     console.log("Toggle background!..")
  //     toggleBackground();
  //   // }
  // }, []);
  const getLocation = async () =>{
    console.log("RUNNING GET LOCATION")
        // requestWritePermission();
        const url = 'locationstore';
        const permissionResult = await requestLocationPermission();
        console.log('result == >', permissionResult);
            // : await requestLocationPermissionIOS();
    
        if (permissionResult == false) {
          return Platform.OS == 'android'
            ? ToastAndroid.show(
                'Location Permission denied by user',
                ToastAndroid.SHORT,
              )
            : Alert.alert(
                'Location blocked',
                'Location is blocked as denied by user , enable in settings and try again',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'Settings', onPress: () => Linking.openSettings()},
                ],
              );
        }
        // console.log('Running....');
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        })
          .then(location => {
            console.log(location)
            dispatch(
              setLocation({
                lat: location.latitude,
                lng: location.longitude,
              }),
            );
            // console.log(location);
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
          });
  }
useEffect(() =>{
  getLocation()
},[]);
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    return () => {
      console.log('Unmount Shake!');
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    async function GetPermission() {
      await requestForegroundPermissions();
      await audioPermission();
      await requestSmsPermission();
      await requestNotificationPermission();
      await requestCameraPermission();
      await requestWritePermission();
      await requestContactsPermission();
      await requestLocationPermission();
    }
    GetPermission();
  }, []);
  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  // return <AppNavigator/>
  return <AppNavigator />;

};

export default App;

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(5000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
