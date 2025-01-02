import React, { useState } from 'react';
import {Icon} from 'native-base';
import {
  Alert,
  Dimensions,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
const {height, width} = Dimensions.get('window');

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// import navigationService from '../navigationService';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const cartData = useSelector(state => state.commonReducer.cart);
  // const navigationN = useNavigation();
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    search,
    showList,
    headerColor,
    titleColor,
    close,
    horizontalDots,
    navigateTO,
    index,
    cart,
    Notify,
    hideUser,
    headerRight,
    // navigation,
    headerStyle,
    textstyle,
    isFilledButton,
    titleIcon, 
    titleIconType,
    titleImage
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const statusArray = [
    {label: 'Change Password', value: 'ChangePassword'},
    {label: 'Terms & Conditions', value: 'TermsAndConditions'},
    {label: 'Financial Breakdown', value: 'FinancialBreakDown'},
    {label: 'Logout', value: 'Logout'},
  ];

  const Confirm = () => {
    Alert.alert('Action required', 'Login to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Login',
        onPress: () => {
          navigationService.navigate('LoginScreen');
        },
      },
    ]);
    return true;
  };

  return (
    <View
      style={[
        styles.header2,
        headerStyle && headerStyle,
        {backgroundColor: headerColor ? headerColor : Color.white},
      ]}>
      <View
        style={{
          height: moderateScale(30, 0.3),
          width: moderateScale(30, 0.3),
          // borderRadius: moderateScale(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: showBack || showList ? 'white' : 'transparent',
        }}>
        {showBack ? (
          <Icon
            name={'arrow-back-ios'}
            as={MaterialIcons}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              navigationN.goBack();
            }}
          />   
        ) : null}
      </View>
      {title ? (
        <View style={[{flexDirection:"row", 
        justifyContent:"flex-start",
        paddingHorizontal:moderateScale(21,0.2),
        width: windowWidth * 0.7,
        gap:moderateScale(10,0.2), alignItems:"center",
        // alignSelf:"center",
        }, !headerRight && {
          marginRight:19
        }]}>
        <CustomText style={[styles.text, textstyle]}>{title}</CustomText> 
        {titleIcon &&  <Icon as={titleIconType}  name={titleIcon} size={moderateScale(24,0.3)} />}
        {titleImage && <CustomImage style={{tintColor:"black"}}  source={titleImage}/>}
        </View> 
      ) : (
        <CustomImage
          resizeMode={'contain'}
          style={{
            width: windowWidth * 0.21,
            // backgroundColor : 'red' ,
            height: windowHeight * 0.05,
          }}
          // source={require('../Assets/Images/customerservice.png')}
        />
      )}


     
     {search && <Icon
            name={'search'}
            as={MaterialIcons}
            size={moderateScale(27, 0.3)}
            color={Color.black}
            onPress={() => {
            }}
          />}
      {!hideUser && cart ? (
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: moderateScale(6, 0.6),
          }}>
          {cartData?.length > 0 && (
            <View
              style={{
                width: moderateScale(14, 0.6),
                height: moderateScale(14, 0.6),
                borderRadius: moderateScale(7, 0.6),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                position: 'absolute',
                right: -4,
                zIndex: 1,
                top: 0,
              }}>
              <CustomText
                style={{
                  fontSize: 8,
                }}>
                {cartData?.length < 10 ? cartData?.length : '9+'}
              </CustomText>
            </View>
          )}

          <Icon
            name={'shopping-cart'}
            as={Feather}
            size={moderateScale(27, 0.3)}
            color={Color.black}
            onPress={() => {
              if (token == null) {
                Confirm();
                // navigationService.navigate('LoginScreen')
              } else if (cartData?.length > 0) {
                navigationService.navigate('CartScreen');
              } else {
                return Platform.OS == 'android'
                  ? ToastAndroid.show('No Item in cart', ToastAndroid.SHORT)
                  : Alert('No Item in cart');
              }
            }}
          />
        </View>
      ) : headerRight ?  (
        <View
          style={{
            width: windowHeight * 0.055,
            justifyContent: 'center',
            alignItems: 'center',
            height: windowHeight * 0.055,
          }}>
            <Icon name={horizontalDots ? "dots-three-horizontal" :'dots-three-vertical'} as={Entypo}  
            onPress={horizontalDots ? ()=> {
              navigation.navigate("Settings")
            } : () =>{} }
            size={moderateScale(22,0.2)}/>
        </View>
      ): null }
    </View>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  text: {
    fontSize: moderateScale(26, 0.6),
    color: Color.black,
  },
  menu: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    textAlign: 'center',
    backgroundColor: 'white',
    paddingTop: moderateScale(7, 0.6),
  },
  shadowporp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    marginTop: moderateScale(60, 0.3),
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(25, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    alignItems: 'center',
  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
  },
  filledButton: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 2,
    backgroundColor: Color.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Header;
