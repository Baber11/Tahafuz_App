import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../Store/slices/auth';

const SignUp = () => {
  const navigation= useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  // const [lastName,setLastName] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  return (
    <ImageBackground
      source={require('../Assets/Images/bgImage2.png')}
      style={styles.main}
      imageStyle={styles.image}
      resizeMode="cover">
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
        <TextInputWithTitle
          title={'Full Name'}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={false}
          placeholder={''}
          setText={setName}
          value={name}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.6}
          border={1}
          backgroundColor={'transparent'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.white}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
          disable
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
          disable
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
          disable
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
          disable
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
        text={"Register"}
        bgColor={"#FFECD0"}
            borderColor={'white'}
            borderRadius={moderateScale(10, 0.4)}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {
              // navigation.navigate("Settings")
              dispatch(setUserToken({token:"abcedfe"}))


            }}
            width={windowWidth * 0.35}
            height={windowHeight * 0.06}
            fontSize={moderateScale(24, 0.3)}
            textTransform={'none'}
            isGradient={false}
            isBold
            marginTop={moderateScale(30, 0.3)}
        />

        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: moderateScale(35, 0.2),
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
    marginTop:moderateScale(75,0.2)
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
