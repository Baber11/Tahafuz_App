import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Header from '../Components/Header';

const SafetyAtWork = () => {
  return (
    <>
    <Header  headerColor={"#FFECD0"} showBack 
    textstyle={{fontWeight: "bold"}}
    title={"Safety At Work"} titleImage={require("../Assets/Images/women1.png")}/>
    <ScrollView>
      <LinearGradient
        colors={['#FFECD0', '#FF3974CC']}
        start={{x: 0.7, y: 0.7}}
        end={{x: 0.9, y: 0.8}}
        style={styles.main}>
        <View style={styles.mainView}>
          <View style={styles.imageContainer}>
            <CustomImage
              source={require('../Assets/Images/illustration2.png')}
              style={styles.image}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <CustomText isBold style={styles.descrition}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Faucibus a pellentesque sit amet porttitor eget dolor morbi non.
              Pharetra convallis posuere morbi leo urna molestie at elementum
              eu. Quis vel eros donec ac odio tempor orci dapibus. Purus sit
              amet luctus venenatis lectus magna fringilla. Vitae et leo duis ut
              diam quam nulla porttitor massa. Convallis posuere morbi leo urna
              molestie at elementum. Nulla aliquet enim tortor at auctor urna.
              Laoreet id donec ultrices tincidunt. Blandit massa enim nec dui
              nunc.
            </CustomText>
            <CustomText isBold style={styles.descrition}>
              Et tortor consequat id porta nibh venenatis cras sed felis.
              Facilisis magna etiam tempor orci eu lobortis elementum nibh
              tellus. Egestas sed sed risus pretium quam vulputate dignissim
              suspendisse. Pulvinar sapien et ligula ullamcorper malesuada proin
              libero nunc consequat. Lorem sed risus ultricies tristique nulla
              aliquet enim tortor. Sed libero enim sed faucibus turpis. Eget
              nunc lobortis mattis aliquam.
            </CustomText>
          </View>
        </View>
      </LinearGradient>

    </ScrollView>
    </>
  );
};

export default SafetyAtWork;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    paddingTop: moderateScale(12, 0.2),
    paddingHorizontal:moderateScale(2,0.3),
    backgroundColor: 'rgba(255,255,255,0.35)',
    gap: moderateScale(20, 0.2),

  },
  imageContainer: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  descriptionContainer: {
    width: '95%',
    paddingHorizontal: moderateScale(2, 0.2),
    gap: moderateScale(20, 0.2),
  },
  descrition: {
    textAlign: 'justify',
    // width: "90%",
    fontSize: moderateScale(14, 0.2),
    lineHeight: moderateScale(19, 0.2),
    //   width: windowWidth
  },
});
