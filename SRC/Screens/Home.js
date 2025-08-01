import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Alert, AppState, DeviceEventEmitter, FlatList, Linking, NativeEventEmitter, NativeModules, PermissionsAndroid, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNAndroidLocationEnabler, { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import ImageSlider from 'react-native-image-slider';
// import Feather from "react-native-vector-icons/Feather";
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {Onbackground, setLocation, setRecordings} from '../Store/slices/common';
import {audioPermission, requestContactsPermission, requestForegroundPermissions, requestLocationPermission, requestNotificationPermission, requestSmsPermission, requestWritePermission, windowHeight, windowWidth} from '../Utillity/utils';
import BackgroundService from 'react-native-background-actions';
import {Icon} from 'native-base';
import RNShake from 'react-native-shake'
import Shake from 'react-native-shake';
import SendSMS from 'react-native-sms'
import mobileSms from 'react-native-mobile-sms';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useFocus } from 'native-base/lib/typescript/components/primitives';
const {ShakeModule} = NativeModules;

const audioRecorderPlayer = new AudioRecorderPlayer();

const Home = () => {
  
  const location = useSelector(state => state.commonReducer.location);
  console.log("🚀 ~ Home ~ location:", location)
  const appIsInBackground = useSelector(state => state.commonReducer.appIsInbackground);
  const backgroundEnabled = useSelector(state => state.commonReducer.backgroundEnabled);
  const contacts = useSelector(state => state.commonReducer.contacts);
  console.log("🚀 ~ contacts:", contacts)
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const DUMMY_PRODUCTS = [
    {
      id: 'p1',
      image: require('../Assets/Images/illustration4.png'),
      title: 'Majestic Vintage Mocha Overcoat',
      price: 129.99,
      description:
        'Channel timeless sophistication with this stunning mocha overcoat. Crafted for the discerning gentleman who appreciates the fine blend of vintage charm and modern elegance.',
    },
    {
      id: 'p2',
      image: require('../Assets/Images/illustration4.png'),
      title: 'Enchanting Blush Dream Gown',
      price: 189.99,
      description:
        'Bask in the glow of elegance with our Enchanting Blush Dream Gown. Embody the regality of a queen with a sweet touch of pink that whispers enchantment. This is the perfect piece for those seeking to create unforgettable moments.',
    },
  
    {
      id: 'p3',
      image: require('../Assets/Images/illustration4.png'),
      title: 'Vintage Sunshine Rain Jacket',
      price: 49.99,
      description:
        'Brace the showers in style! Our Vintage Sunshine Rain Jacket ensures that you stand out, even in the dullest weather. Because rain is never a reason to compromise on your fashion quotient.',
    },
    {
      id: 'p4',
      image: require('../Assets/Images/illustration4.png'),
      title: 'Classic Merlot Business Suit',
      price: 249.99,
      description:
        'Step into the boardroom with unmatched confidence in our Classic Merlot Business Suit. Exuding an air of refined class and understated power, it is ideal for the modern executive who values tradition and elegance.',
    },
   
    {
      id: 'p6',
      image: require('../Assets/Images/illustration4.png'),
      title: 'Pioneer Rugged Denim Jacket',
      price: 79.99,
      description:
        'Our Pioneer Rugged Denim Jacket is a tribute to those who embody the spirit of adventure. Designed with durability and comfort in mind, this jacket is a wardrobe essential for the urban explorer.',
    },
  ];
  const emergencyCardData = [
    {
      id: 1,
      title: 'Active Emergency',
      colors: ['#FC4A1ACC', '#F7B733CC'],
      contact: '1122',
      iconName: 'alert-triangle',
      iconType: Feather,
    },
    {
      id: 2,
      title: 'Police',
      colors: ['#ff6969', '#ffb0b0'],
      contact: '15',
      iconName: 'police-badge',
      iconType: MaterialCommunityIcons,
    },
    {
      id: 3,
      title: 'Ambulance',
      colors: ['#48bfe3', '#64b5f6'],
      contact: '1020',
      iconName: 'ambulance',
      iconType: FontAwesome5,
    },
    {
      id: 4,
      title: 'Fire Brigade',
      colors: ['#ef9cda', '#fc6dab'],
      contact: '16',
      iconName: 'fire',
      iconType: FontAwesome5,
    },
    // {
    //   id: 5,
    //   title: 'Ambulance',
    //   colors: ['#fc6dab', '#e0aaff'],
    //   contact: '1101',
    //   iconName: 'ambulance',
    //   iconType: FontAwesome5,
    // },
    {
      id: 6,
      title: 'PCSW',
      colors: ['#F7B733CC', '#FF3974CC'],
      contact: '1043',
      iconName: 'shield',
      iconType: FontAwesome6,
    },
  ];
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [value, setValue] = useState(0);
  const data = [
    {
      id: 1,
      title: 'Hospitals',
      image: require('../Assets/Images/RedCross.png'), // Replace with your actual path
    },
    {
      id: 2,
      title: 'Medicine',
      image: require('../Assets/Images/Pills.png'), // Replace with your actual path
    },
    {
      id: 3,
      title: 'Bus Stop',
      image: require('../Assets/Images/bus.png'), // Replace with your actual path
    // onPress : async() =>{
    //   // const result =  SendIntentAndroid.sendSms("+923042157462", "HEllo Kese ho?");
    //   const mobileNumber = '+923042157462';
    //   const message = `Kese ho?`;
  
      
    //   // mobileSms.sendDirectSms(mobileNumber, message)
    //   // .then((response) => {
    //   //   console.log("Check you success Messages :",response);
    //   // })
    //   // .catch((error) => {
    //   //   console.log("Check you Error Message :",error);
    //   // })
    //   // console.log(result)
    //   // SendSMS.send({
    //   //   body: 'The default body of the SMS!',
    //   //   recipients: ['0123456789', '03292297354'],
    //   //   successTypes: ['sent', 'queued'],
    //   //   allowAndroidSendWithoutReadPermission: true,
       
    //   // }, (completed, cancelled, error) => {
    
    //   //   console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    
    //   // });
      
    // }
    },
    {
      id: 4,
      title: 'Police',
      image: require('../Assets/Images/police.png'), // Replace with your actual path
    },
  ];
  const startRecording = async () => {
    let i=0;
    console.log("Startrecorder === > ", ++i)
    audioRecorderPlayer.removeRecordBackListener();
    try {
      await audioRecorderPlayer.stopRecorder();
      const result = await audioRecorderPlayer.startRecorder();
      BackgroundService.updateNotification({
        progressBar :{
          max : 30,
          value: value,
          indeterminate: true
        },
        taskDesc:"Recording Started...."})
      console.log('Recording started:', result);
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordingDuration(e.currentPosition);
        setValue((prevState) => ++prevState)
        console.log('🚀 ~ startRecording ~ e:', e.currentPosition);
      });

      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recorder:', error);
    }
  };

  const stopRecording = async () => {
    // console.log(recordingDuration);
    let i=0;
    console.log("Stop recorder === > ", ++i)
    try {
      audioRecorderPlayer.removeRecordBackListener();
      const result = await audioRecorderPlayer.stopRecorder();
      const audioData = await RNFetchBlob.fs.readFile(result, 'base64');
      console.log("🚀 ~ stopRecording ~ audioData:", audioData)
      RNFetchBlob.fs.stat(result).then((stats) => {
        console.log("Recorded file size:", stats.size);
      });
      BackgroundService.updateNotification({
        progressBar: null,
        taskDesc:"Recording Stopped...."})

      console.log('Recording stopped:', result);
      setValue(0);
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
  
  const backgroundActions = async (taskData) =>{
    let i =0;
    const shakeEventEmitter = new NativeEventEmitter(ShakeModule);
              
    const shakeSubscription = shakeEventEmitter.addListener(
      'ShakeEvent',
     async () => {
      console.log('Shake detected in background!', ++i);

    // const mobileNumber = '+923122032631';
                const message = `Help Me!  https://www.google.com/maps?q=${location.lat != undefined ? location.lat : "24.9156682"},${location.lng != undefined ? location.lng : "67.089528"}`;

      // const mobileNumber = '+923110287289';
      //         mobileSms
      //         .sendDirectSms(mobileNumber, message)
      //         .then(response => {
      //           console.log('Message sent successfully:', response);
      //         })
      //         .catch(error => {
      //           console.error('Failed to send message:', error);
      //         });
              for (let contact of contacts){

                const message = `Help Me!  https://www.google.com/maps?q=${location.lat},${location.lng}`;
        mobileSms
          .sendDirectSms(contact.number, message)
          .then(response => {
            console.log('Message sent successfully:', response);
          })
          .catch(error => {
            console.error('Failed to send message:', error);
          });
        
              }
      //       await startRecording();
      // setTimeout(() => {
      //   stopRecording();
      // }, 5000);
      if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)) {
       await startRecording();
        setTimeout(() => {
          stopRecording();
        }, 6000);
      } else {

        await audioPermission();
      }
     
       
      },
      shakeEventEmitter.removeAllListeners("ShakeEvent")
  // shakeSubscription.remove();
    );
    return new Promise(resolve => {})
  }
 
  const options = {
    taskName: 'Background Action Running',
    taskTitle: 'Background Action title',
    taskDesc: 'Background Action description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: 1000,
    },
  };
  // useEffect(() => {
  //   const handleAppStateChange =async  (nextAppState) => {
  //     console.log("📢 AppState changed:", nextAppState, isBackgroundEnabled);
  
  //     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
  //       console.log("✅ App is back in foreground ", BackgroundService.isRunning());
  //       BackgroundService.stop();
  //       // shakeSubscription.remove();
  //       ShakeModule.stopListening();
  //       console.log('Background task ended.');
  //       if (isRecording) {
  //         await audioRecorderPlayer.stop();
  //       }
  //     }
  
  //     if (nextAppState === 'background') {
  //       toggleBackground()
  //     }
  
  //     appState.current = nextAppState;
  //     setAppStateVisible(nextAppState);
  //   };
  
  // const subscription =  AppState.addEventListener("change", handleAppStateChange);
  
  //   return () => {
  //     console.log("🛑 Cleaning up AppState listener...");
  //     subscription.remove()
  //   };
  // }, []);
  const toggleBackground = async () => {
    if (!BackgroundService.isRunning()) {
      try {
        await BackgroundService.start(backgroundActions, options);
      } catch (error) {
        console.log(error);
      }
    } else {
      
      await BackgroundService.stop();
      console.log('✅ background Actions has been stopped.');         
    }
  };
 

  useEffect(()=>{
    if(backgroundEnabled){
      console.log("BG ACTIONS Should be run......" , backgroundEnabled);
      toggleBackground()
    }else{
      BackgroundService.stop() 
    }
  },[backgroundEnabled])

  // GetLocation.getCurrentPosition({
  //   enableHighAccuracy: true,
  //   timeout: 60000,
  // })
  //   .then(location => {
  //     console.log("LOCATION RE-RENDERS HOME------> ",location)
  //     dispatch(
  //       setLocation({
  //         lat: location.latitude,
  //         lng: location.longitude,
  //       }),
  //     );
  //     // console.log(location);
  //   })
  //   .catch(error => {
  //     const {code, message} = error;
  //     console.warn(code, message);
  //   });


    
const getLocation = async () =>{
  console.log("RUNNING GET LOCATION")
      // requestWritePermission();
      const url = 'locationstore';
      const permissionResult = await requestLocationPermission();
      console.log('result == >', permissionResult);
          // : await requestLocationPermissionIOS();
  
      if (!permissionResult) {
         Platform.OS == 'android'
          ? await requestLocationPermission()
          // ToastAndroid.show(
          //   'Location Permission denied by user',
          //   ToastAndroid.SHORT,
          // )
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
    }

// const handleEnableLocation = () => {
//   RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
//     interval: 10000,
//     fastInterval: 5000,
//   })
//     .then(data => {
//       // setIsLoading(true);
//       getLocation();
//       // fetchAddress();
//     })
//     .catch(err => {
//       // setIsLoading(false);
//       console.log(err);
//     });
// };

  // useEffect(() => {
  //   console.log("RENDERS HOME")
  //   //  GetLocation.openSettings().then(response => console.log("Response ==> ", response)).catch(error => console.log("error" , error))
  //   requestLocationPermission()
  //   // handleEnableLocation();
  // }, [isFocused]);
  async function checkLocationISEnabled(){
  // if (Platform.OS === 'android') {
    const checkEnabled = await isLocationEnabled();
    console.log('checkEnabled', checkEnabled)
    if(!checkEnabled){
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
      } catch (error) {
        if (error) {
          console.error(error);
        }
      }
    }
}

useFocusEffect(
  useCallback(
    () => {
      checkLocationISEnabled()

      console.log("RENDERS HOME")
      getLocation()
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          console.log("Refetching locations===>" ,location)
          if(location.latitude == undefined || location.longitude == undefined){
              dispatch(setLocation({
                lat: 24.9156682,
                lng: 67.089528
              }))
          }else{
          }
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
    },
    []
  )
  
   
    // handleEnableLocation();
  );

  return (
    <>
      <Header
        title={'We Admire'}
        textstyle={{
          fontSize: moderateScale(14, 0.2),
        }}
        headerStyle={{
          height: windowHeight * 0.07,
        }}
        headerColor={'#FFECD0'}
        headerRight
        horizontalDots={true}
        backgroundEventEnabled={true}
        toggleBackgroundEvent={() => {
          toggleBackground();
        }}
      />
      <LinearGradient
        colors={['#FFECD0', '#FF3974CC']}
        start={{x: 0.7, y: 0.7}}
        end={{x: 0.9, y: 0.8}}
        style={styles.main}>
          <ScrollView showsVerticalScrollIndicator={false}
    style={{width: windowWidth, 
      
      paddingHorizontal: moderateScale(12, 0.2),
    }}
          >
        <CustomText style={styles.title} isBold>
          Your Strong Personality.
        </CustomText>
        <View 
        style={styles.card}
        >
          {/* <View style={styles.textContainer}>
            <CustomText style={styles.txt} isBold>
              Be
            </CustomText>
            <CustomText style={styles.txt2} isBold>
              Productive
            </CustomText>
          </View> */}
          {/* <View style={styles.imgContainer}>
            <CustomImage
              resizeMode={'contain'}
              source={require('../Assets/Images/illustration4.png')}
              style={styles.image}
            />
          </View> */}
          <ImageSlider
      
      // loopBothSides
      // autoPlayWithInterval={3000}
      images={[
       {image: require('../Assets/Images/illustration6.jpeg'),
        link: "https://plan-international.org/case-studies/16-ways-to-end-violence-towards-girls/"
      },
       {image: require('../Assets/Images/illustration7.jpeg'),
        link: "https://www.healthline.com/health/womens-health/self-defense-tips-escape"
      },
       { image: require('../Assets/Images/illustration8.jpeg'),
      link: "https://www.healthline.com/health/womens-health/self-defense-tips-escape"
      }
    ]}
      customSlide={({ index, item, style, width }) => (
        // It's important to put style here because it's got offset inside
        <View key={index} 
        
        style={[styles.customSlide]} 
        onPress={() =>{
          console.log("Index ====> ",item)
        }}>
          {/* <Text>{item?.name}</Text> */}
          <View style={{ width: windowWidth * 0.9, 
    height: windowHeight * 0.25,
    borderRadius: 35,
        overflow: "hidden",
    // borderColor:"red",
    // borderWidth:2,
    // backgroundColor:"black", // Add background if needed
    // elevation: 5, // Shadow for Android
    // shadowColor: "#000", 
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 14,
           
          }}>
  
          <CustomImage onPress={() =>{
            // setCurrImageIndex(index);
            Linking.openURL(item.link)
            // setIsVisible(true)
            // navigationService.navigate('Image', {
            //   imageData: {
              //     uri: `${baseUrl}/${item?.name}`,
              //     index: index
              //   }
              // })
              console.log("Index ====> ",index)
            }} source={item?.image} 
            resizeMode={"stretch"}
            style={styles.customImage} />
              </View>

        </View>
      )}
      
    /> 
        </View>
        <View style={styles.emergencyTextView}>
          <CustomText style={styles.title} isBold>
            Emergency
          </CustomText>
          <CustomText style={styles.more} isBold>
            See More
          </CustomText>
        </View>
        <View style={{paddingVertical: moderateScale(30, 0.2)}}>
          <FlatList
            contentContainerStyle={{
              gap: moderateScale(20, 0.2),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={emergencyCardData}
            renderItem={({item, index}) => {
              return (
                <LinearGradient
                  colors={item.colors}
                  start={{x: 0.5, y: 0.1}}
                  end={{x: 0.6, y: 0.5}}
                  style={styles.emergencyCard}>
                  <Icon
                    as={item.iconType}
                    style={{width: moderateScale(100, 0.2)}}
                    name={item.iconName}
                    color={Color.black}
                    size={moderateScale(30, 0.3)}
                  />
                  <CustomText style={{color: Color.white}} isBold>
                    {item.title}
                  </CustomText>
                  <CustomText style={{color: Color.white}} isBold>
                    {`Call ${item.contact} for ${item.title}`}
                  </CustomText>
                  <View style={styles.emergencyNumbContainer}>
                    <CustomButton
                      text={item.contact}
                      alignSelf="flex-start"
                      bgColor={Color.white}
                      borderColor={'white'}
                      borderRadius={moderateScale(24, 0.4)}
                      borderWidth={1}
                      textColor={'#FC4A1ACC'}
                      onPress={() => {
                        const url = `tel:${item.contact}`;
                        console.log("TRIGGERING SHAKE")
                        // dispatch(Onbackground(true));
                     
                      
                        Linking.openURL(url).catch(err =>
                          console.error('Failed to open dial pad:', err),
                        );
                      }}
                      width={windowWidth * 0.2}
                      height={windowHeight * 0.04}
                      fontSize={moderateScale(24, 0.3)}
                      textTransform={'none'}
                      isGradient={false}
                      isBold
                      //    marginTop={moderateScale(30, 0.3)}
                    />
                  </View>
                </LinearGradient>
              );
            }}
          />
        </View>

        <CustomText style={styles.title} isBold>
          Explore Live Safe
        </CustomText>
        <View style={styles.exploerView}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity 
              // onPress={item.onPress}
              key={index} style={styles.exploreItem}>
                <View style={styles.exploreCard}>
                  <CustomImage
                    source={item.image}
                    onPress={() => {
                      // item?.onPress()
                      Linking.openURL(
                        `geo:${location.latitude},${
                          location.longitude
                        }?q=${encodeURIComponent(item.title)}`,
                      );
                    }}
                  />
                </View>
                <CustomText>{item.title}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
        style={{height:windowHeight * 0.15}}
        />
      </ScrollView>
      </LinearGradient>

    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight * 0.93,
    // alignItems:"center",
  },
  title: {
    fontSize: moderateScale(25, 0.3),
  },
  emergencyTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  more: {
    fontSize: moderateScale(16, 0.2),
    color: '#3059DE',
  },
  card: {
    width: windowWidth,
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: moderateScale(10, 0.2),
    justifyContent: 'center',
    // alignItems:"center",
    marginTop: moderateScale(4, 0.2),
    // paddingVertical:moderateScale(15,0.2),
    overflow: 'hidden',
    // borderRadius: moderateScale(20, 0.3),
  },
  emergencyCard: {
    width: windowWidth * 0.65,
    backgroundColor: Color.white,
    flexDirection: 'Column',
    alignSelf: 'center',
    // alignItems:"center",
    paddingHorizontal: moderateScale(12, 0.2),
    gap: moderateScale(5, 0.2),
    alignItems: 'flex-start',

    marginTop: moderateScale(10, 0.2),
    paddingVertical: moderateScale(15, 0.2),
    overflow: 'hidden',
    borderRadius: moderateScale(20, 0.3),
  },
  textContainer: {
    width: '45%',
    justifyContent: 'center',
    marginLeftLeft: moderateScale(12, 0.2),
    paddingLeft: moderateScale(17, 0.2),
  },
  txt: {
    fontSize: moderateScale(25, 0.23),
  },
  txt2: {
    width: '100%',
    fontSize: moderateScale(23, 0.2),
  },
  imgContainer: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  exploreCard: {
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    backgroundColor: Color.white,
    borderRadius: moderateScale(8, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  exploreItem: {
    width: windowWidth * 0.24,
    gap: moderateScale(5, 0.2),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  exploerView: {
    width: windowWidth * 0,
    flexDirection: 'row',
    marginTop: moderateScale(22, 0.3),
  },
  emergencyNumbContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(12, 0.2),
  },
  customSlide: {
    width:windowWidth ,
    height:windowHeight * 0.36,
    backgroundColor: '#FFECD0',
    // paddingVertical:moderateScale(20,0.2),
    // overflow:'hidden',
    // overflow:"hidden",
alignItems:"center",
justifyContent:"center"

  },
  customImage: {
    width: "100%",
    height: '100%',
    // borderColor:"green",
    // borderWidth:5,
    // overflow:"hidden",
    // borderRadius:moderateScale(20,0.4)
  },
   
});





