import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogin, setUserToken } from '../Store/slices/auth';
import { validateEmail } from '../Config';
import { Icon } from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import { setUserData } from '../Store/slices/common';
import { Post } from '../Axios/AxiosInterceptorFunction';
import Header from '../Components/Header';
import LinearGradient from 'react-native-linear-gradient';

const ChangePassword = () => {
  const navigation= useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  
  const changePassword = async () =>{
    const url='auth/change_password';
    const body={
      current_password: currPassword,
      new_password :newPassword,
      confirm_password: confirmPassword,
    }
    for (let key in body){
      if(body[key] == ""){
        return ToastAndroid.show(`${key} must not be empty.`, ToastAndroid.SHORT);
      } 
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if(response != undefined){
        ToastAndroid.show("Password updated Successf", ToastAndroid.SHORT);
        navigation.goBack();
    }
  }

  return (
   <>
   <Header
        title={"Change Password"}
  
        textstyle={{fontWeight: "bold"}}
        showBack headerColor={"#FFECD0"}
        
        titleIcon={"key"} 
    titleIconType={FontAwesome6}
        headerRight={true}
        />
        {/* <ScrollView> */}
        <LinearGradient 
    colors={["#FFECD0","#FF3974CC"]}
    start={{x: 0.7, y:0.7 }}
    end={{x: 0.9, y:0.8 }}
    style={styles.main}
    >
        <View style={styles.mainSettings}>
          
        <View style={styles.imageContainer}>
          <CustomImage 
          style={styles.image}
          source={require("../Assets/Images/changePassword.png")}
          />
        </View>
    
        <View style={styles.form}>
      
        <TextInputWithTitle
          title={'Current Password'}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={true}
          placeholder={''}
          setText={setCurrPassword}
          value={currPassword}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.6}
          border={1}
          backgroundColor={"#f7d29c"}
          borderColor={"#bd8024"}
          marginTop={moderateScale(12, 0.3)}
          color={"#d4850e"}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
        />
        <TextInputWithTitle
          title={'New Password'}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={true}
          placeholder={''}
          setText={setNewPassword}
          value={newPassword}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.6}
          border={1}
          backgroundColor={"#f7d29c"}
          marginTop={moderateScale(12, 0.3)}
          color={"#d4850e"}
          borderColor={"#bd8024"}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
          disable
        />
         <TextInputWithTitle
          title={'Confirm Password'}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={true}
          placeholder={''}
          setText={setConfirmPassword}
          value={confirmPassword}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.6}
          border={1}
          borderColor={"#bd8024"}
          backgroundColor={"#f7d29c"}
          marginTop={moderateScale(12, 0.3)}
          color={"#bd8024"}
          placeholderColor={"#d4850e"}
          borderRadius={moderateScale(10, 0.4)}
        />
           <CustomButton
        text={ isLoading ? <ActivityIndicator color={"white"} size={moderateScale(24,0.3)}/> : "Change"}
        bgColor={"#FF3974CC"}
            borderColor={'white'}
            borderRadius={moderateScale(10, 0.4)}
            borderWidth={1}
            textColor={Color.white}
            onPress={() => {
                changePassword()
            }}
            width={windowWidth * 0.35}
            height={windowHeight * 0.06}
            fontSize={moderateScale(24, 0.3)}
            textTransform={'none'}
            isGradient={false}
            isBold
            marginTop={moderateScale(30, 0.3)}
            disabled={isLoading}
        />
        </View>
        </View>
    </LinearGradient>
   </> 
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: "100%",
    alignItems:"center"
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: moderateScale(35, 0.2),
  },
  mainSettings:{
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    justifyContent:"center",
    alignItems:"center",
    paddingTop:moderateScale(12,0.2),
    backgroundColor:"rgba(255,255,255,0.35)",      
    gap:moderateScale(20,0.2),
    paddingHorizontal:moderateScale(20,0.2),
borderRadius:moderateScale(10,0.2),
borderWidth:1,
borderColor:"rgba(255, 255, 255, 0.19)"

},
  profileImage:{
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    overflow: "hidden",
    borderRadius: (windowWidth * 0.2) / 2
  },
  edit: {
    backgroundColor: "#FF3974CC",
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    // position: 'absolute',
    // top:moderateScale(15,0.2),
    bottom: moderateScale(15, 0.3),
    left: moderateScale(15, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    zIndex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(36, 0.3),
    lineHeight: moderateScale(48, 0.1),
    color:"#FFECD0"
  },
  socialbtn: {
    backgroundColor:"#FFECD0",
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    overflow: 'hidden',
    padding: moderateScale(10, 0.2),
    borderRadius: moderateScale(6, 0.3),
  },
  form:{
    width:windowWidth,
    alignItems:"center",
    paddingHorizontal:moderateScale(20,0.2),
    marginTop:moderateScale(15,0.2)
  },
  image2: {
    width: moderateScale(100, 0.2),
    height: moderateScale(100, 0.2),
  },
  actionTextBtn:{
    fontSize:moderateScale(16,0.3),
    lineHeight:moderateScale(21,0.2),
    color: Color.white
  },
  socialButtons:{

    width: windowWidth * 0.65,
    flexDirection:"row",
    gap:moderateScale(15,0.2),    
    marginTop:moderateScale(30,0.2),
    paddingHorizontal:moderateScale(10,0.2)
  },
  actions:{
    width: windowWidth,
    flexDirection:"row",
    alignItems:"flex-end",
    gap:moderateScale(20,0.2),
    paddingHorizontal:moderateScale(10,0.3),
    // justifyContent:"center"
  },
});
