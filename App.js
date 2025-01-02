import React, { useEffect, useState } from 'react';
import LoginScreen from './SRC/Screens/LoginScreen';
import SafetyAtWork from './SRC/Screens/SafetyAtWork';
import { Provider } from 'react-redux';
import { persistor, store } from './SRC/Store';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from './SRC/Screens/SplashScreen';
import { NativeBaseProvider } from 'native-base';
import Settings from './SRC/Screens/Settings';
import AppNavigator from './SRC/appNavigation';
import Contacts from './SRC/Screens/Contacts';
import Profile from './SRC/Screens/Profile';
import Home from './SRC/Screens/Home';
import VoiceRecordings from './SRC/Screens/VoiceRecordings';
import { requestCameraPermission, requestContactsPermission, requestLocationPermission, requestWritePermission } from './SRC/Utillity/utils';

const App = () =>{
    return (
      <NativeBaseProvider>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MainContainer/>
        </PersistGate>
      </Provider>
      </NativeBaseProvider>
    )
}


const MainContainer = () => {
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
      return <SplashScreen />
    }
    // return <AppNavigator/>
    return <AppNavigator/>
    // return <Contacts/>
    // return <Profile/>
    // return <Home/>
    // return <VoiceRecordings/>
    // return <SplashScreen />
    // return <LoginScreen/>
    // return <SafetyAtWork />
    // return <Settings />

}

export default App;

const useloader = value => {
    const [isloading, setIsloading] = useState(value);
    const [loadingTime] = useState(5000);
    useEffect(() => {
      setTimeout(() => setIsloading(false), loadingTime);
    }, []);
    return [isloading];
  };