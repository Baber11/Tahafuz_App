import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import CustomButton from './CustomButton';
import {mode} from 'native-base/lib/typescript/theme/tools';

const Userbox = ({data, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.details_Style}>
      <View style={styles.text_Style}>
        <View style={styles.image_Style}>
          {/* <CustomImage
            style={{width: windowHeight * 0.06, height: windowHeight * 0.06}}
            source={data.image}
          /> */}
        </View>
        <View
          style={{
            width: windowWidth * 0.55,
            marginLeft: moderateScale(20, 0.6),
          }}>
          <CustomText
            style={{fontSize: moderateScale(20, 0.6), color: Color.themeBlack}}>
            {data.userID}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: Color.themeDarkGray,
            }}>
            {data.subtext}
          </CustomText>
        </View>
        <CustomText
          style={{
            fontSize: moderateScale(12, 0.6),
            color: Color.themeDarkGray,
          }}>
          {data.time}
        </CustomText>
      </View>
      {/* <View style={{flexDirection:'row'}}> */}
      <View style={styles.locationStyle}>
        <View style={{flexDirection: 'row', left: moderateScale(2, 0.6)}}>
          <View style={styles.fromLocationStyle}>
            <View style={styles.toLocationStyle}></View>
          </View>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: Color.themeDarkGray,
              marginLeft: moderateScale(5, 0.6),
            }}>
            {data.fromLocation}
          </CustomText>
        </View>
        <View
          style={{
            transform: [{rotate: '90deg'}],
            position: 'absolute',
            width: windowWidth * 0.1,
            top: moderateScale(25, 0.6),
            left: moderateScale(-4, 0.6),
          }}>
          <CustomText style={{color: Color.black}}>........</CustomText>
        </View>
        <View style={{flexDirection: 'row', marginTop: moderateScale(20, 0.6)}}>
          <Icon
            name="location-outline"
            as={Ionicons}
            size={moderateScale(18, 0.6)}
          />
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: Color.themeDarkGray,
              marginLeft: moderateScale(5, 0.6),
            }}>
            {data.toLocation}
          </CustomText>
        </View>
      </View>
      <View style={styles.buttonBox}>
        <CustomButton
          text={'Details'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.themeDarkGray}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.39}
          //   marginTop={moderateScale(10,.3)}
          height={windowHeight * 0.06}
          bgColor={Color.white}
          textTransform={'capitalize'}
          borderWidth={moderateScale(1.5, 0.6)}
          borderColor={Color.themeDarkGray}
        />
        <CustomButton
          text={'History'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.39}
          //   marginTop={moderateScale(10,.3)}
          height={windowHeight * 0.06}
          bgColor={Color.themeBlack}
          textTransform={'capitalize'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Userbox;

const styles = StyleSheet.create({
  details_Style: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.27,
    borderRadius: moderateScale(17, 0.6),
    // backgroundColor:'green',
    borderRadius: moderateScale(17, 0.6),
    borderWidth: 1.8,
    borderColor: Color.boxgrey,
    alignSelf: 'center',
    paddingHorizontal: moderateScale(19, 0.6),
    paddingVertical: moderateScale(7, 0.6),
  },
  image_Style: {
    width: windowWidth * 0.055,
    height: windowWidth * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_Style: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  fromLocationStyle: {
    width: windowWidth * 0.038,
    height: windowWidth * 0.038,
    borderRadius: (windowWidth * 0.038) / 2,
    backgroundColor: Color.circleblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toLocationStyle: {
    width: windowWidth * 0.02,
    height: windowWidth * 0.02,
    borderRadius: (windowWidth * 0.02) / 2,
    backgroundColor: Color.white,
    // left:moderateScale(2,0.6)
  },
  locationStyle: {
    // backgroundColor:'green',
    // alignItems:'center',
    width: windowWidth * 0.55,
    height: windowHeight * 0.08,
    marginLeft: moderateScale(40, 0.6),
    marginTop: moderateScale(15, 0.6),
  },
  buttonBox: {
    flexDirection: 'row',
    gap: moderateScale(5, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.6),
    // backgroundColor:'green',
    // paddingHorizontal:moderateScale(10,0.6)
  },
});
