import React, { useState } from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Icon} from 'native-base';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();
console.log("🚀 ~ audioRecorderPlayer:", audioRecorderPlayer)

const VoiceRecordings = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0); // Total duration of the file
    const [currentPosition, setCurrentPosition] = useState(0); // Current playback position
  
    const playAudio = async () => {
      if (!isPlaying) {
        const path = 'raw/sample1';
      const data=  await audioRecorderPlayer.startPlayer(path);
        console.log("🚀 ~ playAudio ~ data:", data)
        audioRecorderPlayer.addPlayBackListener((ß) => {
          console.log("🚀 ~ audioRecorderPlayer.addPlayBackListener ~ e:", e)
          setCurrentPosition(e.currentPosition);       
          setDuration(e.duration);         
          if (e.currentPosition >= e.duration) {
           stopAudio();
          }
        });
        setIsPlaying(true);
      }
    };
  
    const stopAudio = async () => {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
    };
  const VoiceRecordingsArray = [
    {
      id: 1,
      date: '11/20/2024',
      letter: 'M',
      // iconName:"lock-outline",
      // iconType: MaterialIcons,
      onPress: () => {},
    },
    {
      id: 2,
      date: '11/20/2024',
      letter: 'M',
      iconType: Octicons,
      onPress: () => {
        navigation.navigate('SafetyAtWork');
      },
    },
    {
      id: 3,
      date: '11/20/2024',
      letter: 'M',
      iconType: MaterialCommunityIcons,
      onPress: () => {},
    },
  ];
  return (
    <>
      <Header
        title={'Voice Recordings'}
        titleImage={require('../Assets/Images/Waveform.png')}
        textstyle={{fontWeight: 'bold'}}
        showBack
        headerColor={'#FFECD0'}

        // headerRight
      />
      <LinearGradient
        colors={['#FFECD0', '#FF3974CC']}
        start={{x: 0.7, y: 0.7}}
        end={{x: 0.9, y: 0.8}}
        style={styles.main}>
        <View style={styles.mainVoiceRecordings}>
          {VoiceRecordingsArray.map((item, index) => {
            return (
              <>
                <View style={styles.senderInfoContaier}>
                  <View style={styles.userView}>
                    <CustomText style={styles.letter} isBold>
                      {item.letter}
                    </CustomText>
                  </View>
                  <CustomText>{item.date}</CustomText>
                </View>
                <View style={styles.ListTile}>
                  <View style={styles.leading}>
                    <Icon
                      as={FontAwesome5}
                      name={'play'}
                      color={'#BF55EC'}
                      size={moderateScale(14, 0.3)}
                      onPress={isPlaying ? stopAudio : playAudio}
                    />
                  </View>
                  <View style={styles.imageContainer}>
                    <CustomImage
                      source={require('../Assets/Images/waves.png')}
                      style={styles.image}
                      resizeMode={'contain'}
                    />
                  </View>
                  <CustomText>0:03</CustomText>
                </View>
              </>
            );
          })}
        </View>
      </LinearGradient>
    </>
  );
};

export default VoiceRecordings;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight * 0.9,
    alignItems: 'center',
    // justifyContent:"center"
  },
  mainVoiceRecordings: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    paddingTop: moderateScale(12, 0.2),
    backgroundColor: 'rgba(255,255,255,0.35)',
    gap: moderateScale(20, 0.2),
    paddingHorizontal: moderateScale(20, 0.2),
    borderRadius: moderateScale(10, 0.2),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.19)',
    alignItems: 'center',
  },
  senderInfoContaier: {
    width: windowWidth * 0.45,
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderRadius: moderateScale(12, 0.2),
    elevation: 5,
    gap: moderateScale(11, 0.2),
    paddingHorizontal: moderateScale(5, 0.2),
  },
  userView: {
    backgroundColor: 'tomato',
    width: moderateScale(18, 0.2),
    height: moderateScale(18, 0.2),
    borderRadius: moderateScale(9, 0.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: moderateScale(8, 0.3),
    color: Color.white,
  },
  ListTile: {
    flexDirection: 'row',
    gap: moderateScale(22, 0.2),
    alignItems: 'center',
    backgroundColor: Color.white,
    borderRadius: moderateScale(42, 0.3),
    paddingHorizontal: moderateScale(12, 0.2),
    elevation: 16,
    shadowColor: 'grey',
    shadowOpacity: 0.76,
    shadowRadius: moderateScale(42, 0.5),
    shadowOffset: {width: 0.2, height: 10.6},
  },
  imageContainer: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.25,
    overflow: 'hidden',
  },
  leading: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderRadius: windowWidth * 0.12 * 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#BF55EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(22, 0.2),
    lineHeight: moderateScale(26, 0.5),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
