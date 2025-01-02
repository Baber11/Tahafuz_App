
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';

const SplashScreen = () => {
  // const backgroundImage = require('../Assets/Images/splash.gif');
  return (
    <ImageBackground 
    source={require("../Assets/Images/Splash-Screen-2.png")}
    imageStyle={{width:"100%", height:"100%"}}
    resizeMode='stretch'
    style={styles.container}>

      <View style={styles.logo_Container}>
        <CustomImage
          source={require('../Assets/Images/Heart2.png')}
          style={styles.logo}
          resizeMode={"contain"}
        />
      </View>
      <CustomText style={styles.LogoText}>
        APP LOGO HERE
      </CustomText>
    </ImageBackground>
  );
};

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  logo_Container: {
    height: windowWidth * 0.6,
    width: windowWidth * 0.6,
    overflow:"hidden",
    // elevation:100,
    // shadowColor:"pink"
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  bottomImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.3,
  },
  text:{
    width:'80%',
    textAlign:'center',
    fontSize:moderateScale(11,.6),
    position:'absolute',
    bottom:35,

  },

  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
    color:"#FF3974"
  },
});

export default SplashScreen;
