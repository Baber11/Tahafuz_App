import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import BackgroundService from 'react-native-background-actions';
import RNShake from 'react-native-shake';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './SRC/Screens/SplashScreen';
import {persistor, store} from './SRC/Store';
import AppNavigator from './SRC/appNavigation';
import {Alert, AppState, DeviceEventEmitter, NativeModules, PermissionsAndroid} from 'react-native';
import {
  requestAudoRecordPermission,
  requestCameraPermission,
  requestContactsPermission,
  requestLocationPermission,
  requestNotificationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import {Onbackground, setRecordings} from './SRC/Store/slices/common';
import moment from 'moment';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';



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
const [recordingDuration,setRecordingDuration] = useState(0);
    const [currentState, setCurrentState] = useState('active');
  console.log('🚀 ~ MainContainer ~ currentState:', currentState);
  const background = useSelector(state => state.commonReducer.background);
  console.log('🚀 ~ MainContainer ~ background:', background);
  const dispatch = useDispatch();

  const _handleAppStateChange = async nextAppState => {
    console.log('🚀 ~ MainContainer ~ nextAppState:', nextAppState);
    console.log('App state changed:', nextAppState);

    if (nextAppState === 'active') {
      // Stop recording if the app is reopened
      if (isRecording) {
        await audioRecorderPlayer.stop();
      }
      // setCurrentState(nextAppState);
    } else if (nextAppState.match(/inactive|background/)) {
      setCurrentState(nextAppState);
      toggleBackground();
    }
    // if (nextAppState === 'active') {
    //   dispatch(Onbackground(false));
    // } else
    //   currentState.match(/inactive|background/) && nextAppState === 'active';
    // setCurrentState(nextAppState);
  };

  const options = {
    taskName: 'Recprder Running',
    taskTitle: 'Background Action title',
    taskDesc: 'Recording your voice in background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'myapp',
    parameters: {
      delay: 10000,
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
      await audioRecorderPlayer.stopRecorder()
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
        duration:moment.utc(durationt.asMilliseconds()).format("mm:ss"),
        date:formattedDate
      };

      dispatch(setRecordings(audioFileObject));
    } catch (error) {
      console.error('Error stopping recorder:', error);
    }
  };
  const backgroundActions = async taskData => {
    console.log('functione me bhi agaya ha');
    const {delay} = taskData;

    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)) {
     await startRecording();
     setTimeout(() => {
       stopRecording();
      }, 10000);
    } else {

      await requestAudoRecordPermission();
    }
    
    await new Promise(r => setTimeout(r, delay));

    }
  

  useEffect(() => {
    const shakeSubscription = RNShake.addListener("shake",() => {
      Alert.alert('Shake Event Detected');
      console.log('Shake Detected!');
    });

    return () => {
      shakeSubscription.remove();
    };
  }, []);

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

  //   if (currentState == 'background') {
  //     console.log("Toggle background!..")
  //     toggleBackground();
  //   }
  // }, [currentState]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    return () =>{
     console.log("Unmount Shake!")
      subscription.remove();
    } 
      
  }, []);

  useEffect(() => {
    async function GetPermission() {
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
  // return <Contacts/>
  // return <Profile/>
  // return <Home/>
  // return <VoiceRecordings/>
  // return <SplashScreen />
  // return <LoginScreen/>
  // return <SafetyAtWork />
  // return <Settings />
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
