import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import navigationService from './navigationService';
import LoginScreen from './Screens/LoginScreen';
import { Icon } from 'native-base';
import SignUp from './Screens/SignUp';
import SafetyAtWork from './Screens/SafetyAtWork';
import Settings from './Screens/Settings';
import Home from './Screens/Home';
import VoiceRecordings from './Screens/VoiceRecordings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Screens/Profile';
import Contacts from './Screens/Contacts';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"; 
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from './Utillity/utils';
import Color from './Assets/Utilities/Color';
import CustomImage from './Components/CustomImage';
import ContactsScreen from './Screens/Contacts';
// import {createDrawerNavigator} from '@react-navigation/drawer';

// enableScreens();
const AppNavigator = () => {
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const role = useSelector(state => state.authReducer.role);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen = token ? "TabNavigation" : "LoginScreen";
 
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
          <RootNav.Screen name="Settings" component={Settings} /> 
          {/* <RootNav.Screen name="Home" component={Home} />
          <RootNav.Screen name="SafetyAtWork" component={SafetyAtWork} />
          <RootNav.Screen name="VoiceRecordings" component={VoiceRecordings} />

          // 
          // */}
          {/* <RootNav.Screen name="ChangePassword" component={ChangePassword} /> */}
          <RootNav.Screen name="Signup" component={SignUp} />
          {/* <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="Profile" component={Profile} /> */}
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};
export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        
        tabBarStyle: { 
          
          height: windowHeight * 0.075,
          backgroundColor: "rrgba(255, 236, 208, 0.45)" },
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.white;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;
          if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
            type = FontAwesome6;
            color = focused ? Color.black : Color.black;
            size = focused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
          } else if (route.name === 'Contacts') {
            iconName = focused ? 'phone-call' : 'phone-call';
            type = Feather;
            color = focused ? Color.black : Color.black;
            size = focused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
          } else if (route.name === 'Home') {
            iconName = focused ? 'home-outline' : 'home';
            type = Ionicons;
            color = focused ? Color.black : Color.black;
            size = focused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
          } else if (route?.name == 'SafetyAtWork') {

            size = focused ? moderateScale(35, 0.3) : moderateScale(30, 0.3);
            iconName = focused ? 'alert-triangle' : 'alert-triangle';
            color = focused ? Color.black : Color.black;
            type = Feather;

          } else {
          
          }
          return route.name == "SafetyAtWork" ? (
            
              <View
                style={{
                  width: windowHeight * 0.08,
                  height: windowHeight * 0.08,
                  backgroundColor: "#FF7CA3",
                  borderRadius: (windowHeight * 0.08) /2,
                  alignItems: 'center',
                  overflow:"hidden",
                  justifyContent: 'center',
                position: 'absolute',
                  bottom: moderateScale(6, 0.6),
                }}>
                <Icon name={iconName} as={type} color={color} size={size} />
              </View>
          ) : route.name == "VoiceRecordings" ? (
            <CustomImage source={require("./Assets/Images/Waveform.png")}/>
          ) :(
            // <ReanimatedCurvedTabBar height={230} reactNaviagtionBar={true}   {...props} iconsArray={[...Array(ARRAY_LENGTH)].map((item, index) => (
            //   <View style={styles.icon}>
            //     <Text>{index + 1}</Text>
            //   </View>
            // ))}
            //   allowDropAnime={true} />
            <Icon name={iconName} as={type} color={color} style={{textAlign:"center"}} size={size} />
          );

          // route.name == 'CreateNew' ? (
          //   <View
          //     style={{
          //       borderWidth: 5,
          //       borderColor: Color.lightGrey,
          //       height: moderateScale(60, 0.3),
          //       width: moderateScale(60, 0.3),
          //       borderRadius: moderateScale(30, 0.3),
          //       backgroundColor: '#16232B',
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       marginTop: moderateScale(-30, 0.3),
          //     }}>
          //     <Icon
          //       name={'plus'}
          //       as={type}
          //       color={Color.white}
          //       size={moderateScale(30, 0.3)}
          //     />
          //   </View>
          // ) : (
          //   <Icon name={iconName} as={type} color={color} size={size} />
          // );
        },
       
        tabBarShowLabel: false,
      })}>

      <Tabs.Screen name={'Contacts'} component={ContactsScreen} />
      <Tabs.Screen name={'VoiceRecordings'} component={VoiceRecordings} />
      <Tabs.Screen name="SafetyAtWork" component={SafetyAtWork}/>
      <Tabs.Screen name={'Profile'} component={Profile} />
      <Tabs.Screen name={'Home'} component={Home} />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
