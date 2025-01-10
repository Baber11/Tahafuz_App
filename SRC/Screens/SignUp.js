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
import { useDispatch } from 'react-redux';
import { setUserLogin, setUserToken } from '../Store/slices/auth';
import { validateEmail } from '../Config';
import { Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePickerModal from '../Components/ImagePickerModal';
import { setUserData } from '../Store/slices/common';
import { Post } from '../Axios/AxiosInterceptorFunction';

const SignUp = () => {
  const navigation= useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  // const [lastName,setLastName] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [phoneNum, setPhoneNum] = useState('');
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signUp = async () =>{
    const url='register';
    const body={
      full_name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      phone: phoneNum
    }

    const formData = new FormData();
    
    for (let key in body){
      if(body[key] == " "){
        return ToastAndroid.show(`${key} must not be empty.`, ToastAndroid.SHORT);
      } else{
        formData.append(key, body[key]);
      }
    }
    if(Object.keys(image).length > 0) {
      formData.append("photo", image);
    } else{

    }
  //  return console.log("🚀 ~ signUp ~ formData:", JSON.stringify(formData,null,2))

    if(!validateEmail(email)){
      return ToastAndroid.show(`EMAIL is invalid.`, ToastAndroid.SHORT);
    }
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader());
    setIsLoading(false);
    if(response != undefined){
      
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserLogin(response?.data?.token));
      dispatch(setUserToken({token: response?.data?.token}));
    }
  }

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style={{ paddingBottom:100}}>

       <ImageBackground
      source={require('../Assets/Images/bgImage2.png')}
      style={styles.main}
      imageStyle={styles.image}
      // resizeMode="stretch"
      >

      <View style={styles.imageContainer}>
        <CustomImage
          source={require('../Assets/Images/Illustration.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.form}>
        <CustomText style={styles.heading} isBold>
          Sign Up
        </CustomText>
<View style={{justifyContent:"center", alignItems:"center"}}>

        <View style={styles.profileImage}>
          <CustomImage 
          style={styles.image}
          source={{uri: image?.uri ? image?.uri :"https://randomuser.me/api/portraits/women/4.jpg"}}
          />
        </View>
           <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={styles.edit}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.white}
                size={moderateScale(16, 0.3)}
                />
            </TouchableOpacity>
            </View>
        <TextInputWithTitle
          title={'Full Name'}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={false}
          placeholder={''}
          setText={setName}
          value={name}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.7}
          border={1}
          backgroundColor={'transparent'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.white}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
          // disable
        />
        <TextInputWithTitle
          title={'Email'}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={false}
          placeholder={''}
          setText={setEmail}
          value={email}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.6}
          border={1}
          backgroundColor={'transparent'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.white}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
        />
        <TextInputWithTitle
          title={'Password'}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={true}
          placeholder={''}
          setText={setPassword}
          value={password}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.6}
          border={1}
          backgroundColor={'transparent'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.white}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
          // disable
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
          backgroundColor={'transparent'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.white}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
          // disable
        />
        <TextInputWithTitle
          title={'Phone'}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={false}
          placeholder={''}
          setText={setPhoneNum}
          value={phoneNum}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.6}
          border={1}
          backgroundColor={'transparent'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.white}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
          // disable
        />
        {/* <View style={styles.socialButtons}>
          <View style={styles.socialbtn}>
            <CustomImage
              source={require('../Assets/Images/gogle.png')}
              style={styles.image}
              resizeMode={'cover'}
            />
          </View>
          <View style={styles.socialbtn}>
            <CustomImage
              source={require('../Assets/Images/meta.png')}
              style={styles.image}
              resizeMode={'cover'}
            />
          </View>
          <View style={styles.socialbtn}>
            <CustomImage
              source={require('../Assets/Images/apple.png')}
              style={styles.image}
              resizeMode={'cover'}
            />
          </View>
        </View> */}
        <View style={styles.actions}>
        <CustomText style={styles.actionTextBtn} onPress={()=>{
          navigation.navigate("LoginScreen")
        }}>Already Member? Sign in</CustomText>
        <CustomButton
        text={ isLoading ? <ActivityIndicator color={"white"} size={moderateScale(24,0.3)}/>  :"Register"}
        bgColor={"#FFECD0"}
            borderColor={'white'}
            borderRadius={moderateScale(10, 0.4)}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {
              // navigation.navigate("Settings")
              // dispatch(setUserToken({token:"abcedfe"}))
              signUp()


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
      <View
      style={{height: windowHeight * 0.1}}
      />
       </ImageBackground>
       <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
    </ScrollView>
    
  );
};

export default SignUp;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: "100%",
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: moderateScale(35, 0.2),
  },
  profileImage:{
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    overflow: "hidden",
    borderRadius: (windowWidth * 0.25) / 2
  },
  edit: {
    backgroundColor: "#FF3974CC",
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    // position: 'absolute',
    // top:moderateScale(15,0.2),
    bottom: moderateScale(25, 0.3),
    left: moderateScale(35, 0.3),
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
    
    paddingHorizontal:moderateScale(20,0.2),
    marginTop:moderateScale(120,0.2)
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
