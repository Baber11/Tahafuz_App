import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import BackgroundService from 'react-native-background-actions';
import RNShake from 'react-native-shake';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './SRC/Screens/SplashScreen';
import {persistor, store} from './SRC/Store';
import AppNavigator from './SRC/appNavigation';
import {Alert, AppState, DeviceEventEmitter, NativeModules} from 'react-native';
import {
  requestCameraPermission,
  requestContactsPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import {Onbackground} from './SRC/Store/slices/common';



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

const MainContainer = () => {
  const [currentState, setCurrentState] = useState('active');
  console.log('🚀 ~ MainContainer ~ currentState:', currentState);
  const background = useSelector(state => state.commonReducer.background);
  console.log('🚀 ~ MainContainer ~ background:', background);
  const dispatch = useDispatch();

  const _handleAppStateChange = nextAppState => {
    console.log('🚀 ~ MainContainer ~ nextAppState:', nextAppState);
    if (nextAppState === 'active') {
      dispatch(Onbackground(false));
    } else
      currentState.match(/inactive|background/) && nextAppState === 'active';
    setCurrentState(nextAppState);
  };

  const options = {
    taskName: 'Background Action Running',
    taskTitle: 'Background Action title',
    taskDesc: 'Background Action description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'myapp',
    parameters: {
      delay: 1000,
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

  const backgroundActions = async taskData => {
    console.log('functione me bhi agaya ha');
    const {delay} = taskData;
    while (BackgroundService.isRunning()) {
      try {
        console.log('hello app is in background');
      } catch (error) {
        console.error('Error in tracking task:', error);
      }
      await new Promise(r => setTimeout(r, delay));
    }
  };

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
    if (!playing) {
      try {
        console.log('try me agya ha');
        // await BackgroundService.start(backgroundActions, options);
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
  //     // toggleBackground();
  //   }
  // }, [currentState]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener(
  //     'change',
  //     _handleAppStateChange,
  //   );
  //   return () =>{
  //    console.log("Unmount Shake!")
  //     subscription.remove();
  //   } 
      
  // }, []);

  useEffect(() => {
    async function GetPermission() {
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
