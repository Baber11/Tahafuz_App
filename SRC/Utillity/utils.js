import React from 'react';
import {Alert, Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoaction} from '../Store/slices/common';
import {setAudioPermissionGranted} from '../Store/slices/common';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const requestLocationPermission = async () => {
//   console.log("🚀 ~ requestLocationPermission ~ requestLocationPermission :" )
//   const dispatch = useDispatch();
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Access Required',
//         message: 'This App needs to Access your location',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("🚀 ~ requestLocationPermission ~ granted:", granted)
//       // dispatch(setLoaction(granted));
//       console.log('You can use the Location');
//       return true;
//     } else {
//       console.log('Location permission denied');

//       return false;
//     }
//   } catch (err) {
//     console.warn(err);
//   }

// };

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Location');
      return true;
    } else {
      console.log('Location permission denied');
      return false
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestContactsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You have access of contacts');
    } else {
      console.log('Contacts permission denied');
    }
  } catch (error) {
    console.warn(err);
  }
};

// const requestContactsPermission = async () => {
//   console.log('running contacts Permission');
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//       {
//         title: 'Contacts',
//         message: 'This app would like to view your contacts.',
//         buttonPositive: 'Please accept bare mortal',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You have access of contacts');
//     } else {
//       console.log('Contacts permission denied');
//     }
//   } catch (error) {
//     console.warn(err);
//   }
// };

// const requestVoiceRecorderPermission = async () =>{
//   try{
//     const granted= await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.REC)
//   }catch(err){}
// }

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'Breakaway App needs access to your camera ' +
          'so you can take awesome pictures.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestNotificationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message: 'Breakaway App needs allow to send notifications ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission denied');
    } else {
      console.log('Now you can recieve notifications..');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestSmsPermission = async () => {
  console.log("Insikde sms permissions.....")
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'SMS Permission',
        message: 'This app needs access to send SMS.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('SMS permission granted');
    } else {
      console.log('SMS permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const audioPermission = async () => {
  const dispatch = useDispatch();
  
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Recorder Permissions',
        message: 'This App needs to Access your Voice Recorder',
      },
    );
    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission granted');
      dispatch(setAudioPermissionGranted(true));
    } else {
      // setAudioPermissionGranted(false)
      dispatch(setAudioPermissionGranted(false));
      console.log('Permission not granted');
    }
  } catch (err) {
    console.warn(err);
  }
};
// const requestSmsPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.SEND_SMS,
//       {
//         title: 'SMS Permission',
//         message: 'This app needs access to send SMS.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('SMS permission granted');
//     } else {
//       console.log('SMS permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

// const audioPermission = async () => {
//   const dispatch = useDispatch();
//   console.log('AAAAAA');
//   console.log('ERunning Permission audio');
//   try {
//     const grant = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       {
//         title: 'Recorder Permissions',
//         message: 'This App needs to Access your Voice Recorder',
//       },
//     );

//     if (grant == PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Permission granted');
//       dispatch(setAudioPermissionGranted(true));
//     } else {
//       // setAudioPermissionGranted(false)
//       dispatch(setAudioPermissionGranted(false));
//       console.log('Permission not granted');
//     }
//   } catch (error) {
//     console.log('this is the audio recording error ==>', error);
//   }
// };

// const requestNotificationPermission = async () => {
//   console.log('ERunning Permission Notification');

//   try {
//     if (Platform.OS == 'android' && Platform.Version >= 33) {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//       );

//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Notification permission denied');
//       } else {
//         console.log('Now you can recieve notifications..');
//       }
//     }
//   } catch (err) {
//     console.log('Error while request for notifications Permissions.', err);
//   }
// };

// const requestWritePermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       {
//         title: 'Storage Access Required',
//         message: 'This App needs to Access your Storage',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the Storage');
//     } else {
//       console.log('Storage permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const requestWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Access Required',
        message: 'This App needs to Access your Storage',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Storage');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestSensorPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
        {
          title: 'Sensor Access Permission',
          message:
            'This app requires access to motion sensors to detect shake gestures.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Granted', 'You can now use shake detection.');
      } else {
        Alert.alert('Permission Denied', 'Shake detection will not work.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
const PERMISSIONS = {
  FOREGROUND_SERVICE_MICROPHONE:
    'android.permission.FOREGROUND_SERVICE_MICROPHONE',
};

// const requestForegroundPermissions = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PERMISSIONS.FOREGROUND_SERVICE_MICROPHONE,
//       {
//         title: 'Background Microphone Permission',
//         message:
//           'This app requires access to microphone to record in background.',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Foreground Service permissions granted');
//       return true;
//     } else {
//       console.log('Foreground Service permissions denied');
//       return false;
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const requestForegroundPermissions = async () => {
  console.log("SSSSSS  ", Platform);
  if (Platform.OS === 'android' && Platform.Version >= 34) {
    console.log('INSIDE IF BLOCK', Platform.OS, Platform.Version);
    try {
      const granted = await PermissionsAndroid.request(
        PERMISSIONS.FOREGROUND_SERVICE_MICROPHONE,
        {
          title: 'Background Microphone Permission',
          message:
            'This app requires access to microphone to record in background.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Foreground Service permissions granted');
        return true;
      } else {
        console.log('Foreground Service permissions denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }}

//   // console.log("Entered in the foregroundSerivceRequest == >  ")
//   // // if(Platform.OS == "android" && Platform.ver)
//   // if (Platform.OS === 'android' && Platform.Version >= 34) {
//   //   try {
//   // console.log("Entered in the foregroundSerivceRequest == >  ", Platform.OS, Platform.Version);

//   // const granted = await PermissionsAndroid.request(
//   //   // PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE,
//   //   // PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE_MEDIA_PROJECTION,
//   //   PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE_MICROPHONE,
//   //   {
//   //     title: "Background Microphone Permission",
//   //     message: "This app requires access to microphone to record in background.",
//   //     buttonPositive: "OK",
//   //   }
//   // );
//   // console.log("🚀 ~ requestForegroundPermissions ~ granted:", granted)
//   // console.log("Entered in the foregroundSerivceRequest == > granted ", granted)

//   //     if (
//   //       // granted[PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE] === PermissionsAndroid.RESULTS.GRANTED &&
//   //       // granted[PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE_MEDIA_PROJECTION] === PermissionsAndroid.RESULTS.GRANTED &&
//   //       granted === PermissionsAndroid.RESULTS.GRANTED
//   //     ) {
//   //       console.log('Foreground Service permissions granted');
//   //       return true;
//   //     } else {
//   //       console.log('Foreground Service permissions denied');
//   //       return false;
//   //     }
//   //   } catch (err) {
//   //     console.warn(err);
//   //   }
//   // }
// };

const apiHeader = (token, isFormData = true) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }
};

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ContainsHTML = str => {
  return /<[a-z][\s\S]*>/i.test(str);
};

export {
  requestLocationPermission,
  requestCameraPermission,
  requestWritePermission,
  requestContactsPermission,
  requestNotificationPermission,
  requestSmsPermission,
  requestSensorPermission,
  audioPermission,
  apiHeader,
  sleep,
  requestForegroundPermissions,
  wait,
  ContainsHTML,
  windowWidth,
  windowHeight,
};
