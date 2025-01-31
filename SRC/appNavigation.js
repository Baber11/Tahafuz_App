import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import {
  NavigationContainer,
  useLinkBuilder,
  useTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, Image, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Color from './Assets/Utilities/Color';
import navigationService from './navigationService';
import ContactsScreen from './Screens/Contacts';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import Profile from './Screens/Profile';
import SafetyAtWork from './Screens/SafetyAtWork';
import Settings from './Screens/Settings';
import SignUp from './Screens/SignUp';
import VoiceRecordings from './Screens/VoiceRecordings';
import { windowHeight, windowWidth } from './Utillity/utils';
import ChangePassword from './Screens/ChangePassword';
// import {createDrawerNavigator} from '@react-navigation/drawer';

// enableScreens();
const AppNavigator = () => {
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const role = useSelector(state => state.authReducer.role);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ AppNavigator ~ token:", token)

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();
  
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    const handleAppStateChange =async  (nextAppState) => {
      console.log("📢 AppState changed:", nextAppState, isBackgroundEnabled);
  
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log("✅ App is back in foreground ", BackgroundService.isRunning());
        // BackgroundService.stop();
        // shakeSubscription.remove();
        // ShakeModule.stopListening();
        console.log('Background task ended.');
        
      }
  
      if (nextAppState === 'background') {
        // toggleBackground()
        console.log("App is agin in background")
      }
  
      appState.current = nextAppState;
      setAppStateVisible(nextAppState);
    };
  
  const subscription =  AppState.addEventListener("change", handleAppStateChange);
  
    return () => {
      console.log("🛑 Cleaning up AppState listener...");
      subscription.remove()
    };
  }, []);


  const AppNavigatorContainer = () => {
    const firstScreen = token ? 'TabNavigation' : 'LoginScreen';
    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          {/* <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen
            name="WalkThroughScreen"
            component={WalkThroughScreen}
          /> */}
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name={'Profile'} component={Profile} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          {/* <RootNav.Screen name="Home" component={Home} />
          <RootNav.Screen name="SafetyAtWork" component={SafetyAtWork} />
          <RootNav.Screen name="VoiceRecordings" component={VoiceRecordings} />

          // 
          // */}
          <RootNav.Screen name="Signup" component={SignUp} />
          {/* <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="Profile" component={Profile} /> */}
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

function MyTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: windowWidth,
        paddingVertical: moderateScale(10, 0.2),
        backgroundColor: 'rrgba(255, 236, 208, 0.45)',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        // console.log("🚀 ~ {state.routes.map ~ options:", options)
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let iconName;
        let color = Color.white;
        let size = moderateScale(20, 0.3);
        let type = Ionicons;
        if (route.name === 'Profile') {
          iconName = isFocused ? 'user' : 'user';
          type = FontAwesome6;
          color = isFocused ? Color.black : Color.black;
          size = isFocused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
        } else if (route.name === 'Contacts') {
          iconName = isFocused ? 'phone-call' : 'phone-call';
          type = Feather;
          color = isFocused ? Color.black : Color.black;
          size = isFocused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
        } else if (route.name === 'Home') {
          iconName = isFocused ? 'home-outline' : 'home-outline';
          type = Ionicons;
          color = isFocused ? Color.black : Color.black;
          size = isFocused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
        } else if (route?.name == 'SafetyAtWork') {
          size = isFocused ? moderateScale(30, 0.3) : moderateScale(30, 0.3);
          iconName = isFocused ? 'alert-triangle' : 'alert-triangle';
          color = isFocused ? Color.black : Color.black;
          type = Feather;
        } else{
          iconName = isFocused ? 'settings-outline' : 'settings-outline';
          type = Ionicons;
          color = isFocused ? Color.black : Color.black;
          size = isFocused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
        }
        return route.name == 'SafetyAtWork' ? (
          <View
            // pressOpacity={0.9}
            // pressColor='red'
            disabled={true}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            style={{
              flex: 1,
              //     paddingVertical:moderateScale(10,0.2),
              justifyContent: 'center',
              alignItems: 'center',
              
            }}>
            <PlatformPressable
          pressOpacity={0.2}
          android_ripple={{color:"transparent",                
          radius: (windowHeight * 0.08) / 2,}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                width: windowHeight * 0.08,
                height: windowHeight * 0.08,
                backgroundColor: '#FF7CA3',
                borderRadius: (windowHeight * 0.08) / 2,
                // textAlign:"center",
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                // paddingVertical:15,
                position: 'absolute',
                bottom: moderateScale(15, 0.6),
              }}>
              {/* <Icon name={iconName} as={type} color={color} size={size} /> */}
            <Image tintColor={Color.black}  source={require('./Assets/Images/women1.png')} />
            </PlatformPressable>
          </View>
        ) : route.name == 'VoiceRecordings' ? (
          <PlatformPressable
            pressOpacity={1}
            android_ripple={{color:"transparent"}}
            
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Image source={require('./Assets/Images/Waveform.png')} />
          </PlatformPressable>
        ) : (
          <PlatformPressable
          pressOpacity={1}
          android_ripple={{color:"#00000018"}}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name={iconName} as={type} color={color} size={size} />
          </PlatformPressable>
        );
      })}
    </View>
  );
}

export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={({route}) => ({
        

        tabBarStyle: {
          paddingVertical: moderateScale(15, 0.2),
          // paddingHorizontal:moderateScale(10,0.2),
          // height: windowHeight * 0.075,

          backgroundColor: 'rrgba(255, 236, 208, 0.45)',
        },
        headerShown: false,

        // tabBarIcon: ({focused}) => {
        //   let iconName;
        //   let color = Color.white;
        //   let size = moderateScale(20, 0.3);
        //   let type = Ionicons;
        //   if (route.name === 'Profile') {
        //     iconName = focused ? 'user' : 'user';
        //     type = FontAwesome6;
        //     color = focused ? Color.black : Color.black;
        //     size = focused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
        //   } else if (route.name === 'Contacts') {
        //     iconName = focused ? 'phone-call' : 'phone-call';
        //     type = Feather;
        //     color = focused ? Color.black : Color.black;
        //     size = focused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
        //   } else if (route.name === 'Home') {
        //     iconName = focused ? 'home-outline' : 'home-outline';
        //     type = Ionicons;
        //     color = focused ? Color.black : Color.black;
        //     size = focused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
        //   } else if (route?.name == 'SafetyAtWork') {

        //     size = focused ? moderateScale(35, 0.3) : moderateScale(30, 0.3);
        //     iconName = focused ? 'alert-triangle' : 'alert-triangle';
        //     color = focused ? Color.black : Color.black;
        //     type = Feather;

        //   } else {

        //   }
        //   return route.name == "SafetyAtWork" ? (

        //       <View

        //         style={{
        //           width: windowHeight * 0.08,
        //           height: windowHeight * 0.08,
        //           backgroundColor: "#FF7CA3",
        //           borderRadius: (windowHeight * 0.08) /2,
        //           alignItems: 'center',
        //           overflow:"hidden",
        //           justifyContent: 'center',
        //         position: 'absolute',
        //           bottom: moderateScale(6, 0.6),
        //           opacity: focused ? 1 : 0.8,
        //         }}>
        //        <TouchableOpacity
        //     onPress={() => console.log(`${route.name} pressed!`)} // Handle press
        //     activeOpacity={0.2} // Optional opacity feedback

        //     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        //   >
        //     <Icon name={iconName} as={type} color={color} size={size} />
        //   </TouchableOpacity>
        //       </View>
        //   ) : route.name == "VoiceRecordings" ? (
        //     <CustomImage source={require("./Assets/Images/Waveform.png")}/>
        //   ) :(
        //     // <ReanimatedCurvedTabBar height={230} reactNaviagtionBar={true}   {...props} iconsArray={[...Array(ARRAY_LENGTH)].map((item, index) => (
        //     //   <View style={styles.icon}>
        //     //     <Text>{index + 1}</Text>
        //     //   </View>
        //     // ))}
        //     //   allowDropAnime={true} />
        //     <Icon name={iconName} as={type} color={color} style={{textAlign:"center"}} size={size} />
        //   );

        //   // route.name == 'CreateNew' ? (
        //   //   <View
        //   //     style={{
        //   //       borderWidth: 5,
        //   //       borderColor: Color.lightGrey,
        //   //       height: moderateScale(60, 0.3),
        //   //       width: moderateScale(60, 0.3),
        //   //       borderRadius: moderateScale(30, 0.3),
        //   //       backgroundColor: '#16232B',
        //   //       justifyContent: 'center',
        //   //       alignItems: 'center',
        //   //       marginTop: moderateScale(-30, 0.3),
        //   //     }}>
        //   //     <Icon
        //   //       name={'plus'}
        //   //       as={type}
        //   //       color={Color.white}
        //   //       size={moderateScale(30, 0.3)}
        //   //     />
        //   //   </View>
        //   // ) : (
        //   //   <Icon name={iconName} as={type} color={color} size={size} />
        //   // );
        // },

        // tabBarShowLabel: false,
      })}>
      <Tabs.Screen name={'Home'} component={Home} />
      <Tabs.Screen name={'VoiceRecordings'} component={VoiceRecordings} />
      {/* <Tabs.Screen name={'Profile'} component={Profile} /> */}
      <Tabs.Screen name="SafetyAtWork" component={SafetyAtWork} />
      <Tabs.Screen name={'Contacts'} component={ContactsScreen} />
      <Tabs.Screen name={'Settings'} component={Settings} />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
