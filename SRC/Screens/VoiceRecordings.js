import React, { useEffect, useState } from 'react';
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
import {Icon, Progress} from 'native-base';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { addTracks, setupPlayer } from '../Utillity/trackPlayerServices';
import TrackPlayer, {State, usePlaybackState, useProgress} from 'react-native-track-player';
import { freeze } from '@reduxjs/toolkit';

const VoiceRecordings = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null); // Track currently playing
    // console.log("🚀 ~ VoiceRecordings ~ currentTrack:", currentTrack)
    // const [trackProgresses, setTrackProgresses] = useState({});
    const progress = useProgress(1000); // Update every 1 second
    
    const {position, duration} = useProgress(1000);
    // console.log("🚀 ~ VoiceRecordings ~ position:", position)
  const playing=  usePlaybackState();
  // console.log("🚀 ~ VoiceRecordings ~ playing:", playing.state == State.Playing)
  async function handlePlayPress() {
   const {state} = await TrackPlayer.getPlaybackState()
    // console.log("🚀 ~ handlePlayPress ~ TrackPlayer.getPlaybackState(): ",state)
    if(state == State.Playing) {
      TrackPlayer.pause();
    }
    else {
      TrackPlayer.play();
    }
  }

  useEffect(()=>{
    console.log("position >= duration", format(position),format(duration) ,format(position) >= format(duration) )
  async function  handePausePlayerOnEnd(){

    if(playing.state == State.Playing && progress.position >= progress.duration-1 && progress.duration > 0){
      console.log("Hello")
      await TrackPlayer.pause();
      await TrackPlayer.seekTo(0);
    } 
  }
  handePausePlayerOnEnd();
  },[position, playing.state])
    useEffect(() => {
      console.log("Running")
      async function setup() {
        let isSetup = await setupPlayer();
  
        const queue = await TrackPlayer.getQueue();
        if(isSetup && queue.length <= 0) {
          await addTracks();
        }
  
        setIsPlayerReady(isSetup);
      }
  
      setup();
    }, []);

    async function handlePlayPress(trackId, trackFile) {
      if (currentTrack === trackId && playing.state === State.Playing) {
        // console.log("🚀 ~ handlePlayPress ~ playing:", playing)
        // Pause if the same track is already playing
        await TrackPlayer.pause();
      } else {
        // Stop current track if any
        if (playing.state === State.Playing || playing.state === State.Paused) {
          await TrackPlayer.stop();
        }
  
        await TrackPlayer.reset();
        
        await TrackPlayer.add({
          id: trackId.toString(),
          url: trackFile, 
          title: `Track ${trackId}`,
          artist: 'Artist Name',
        });
        await TrackPlayer.play();
        setCurrentTrack(trackId);  
      }
    }
  

    function format(seconds) {
      let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
      let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }
   
  const VoiceRecordingsArray = [
    {
      id: 1,
      date: '11/20/2024',
      letter: 'M',
      // iconName:"lock-outline",
      // iconType: MaterialIcons,
      file: require('../Assets/audio/sample1.mp3'),
      onPress: () => {},
    },
    {
      id: 2,
      date: '11/20/2024',
      letter: 'M',
      iconType: Octicons,
      file: require('../Assets/audio/sample2.mp3'),
      onPress: () => {
        // navigation.navigate('SafetyAtWork');
      },
    },
    {
      id: 3,
      date: '11/20/2024',
      letter: 'M',
      iconType: MaterialCommunityIcons,
      file: require('../Assets/audio/sample1.mp3'),
      onPress: () => {},
    },
  ];


  const trackProgresses = VoiceRecordingsArray.reduce((acc, item) => {
    if (currentTrack === item.id) {
      // Update progress for the currently playing track
      const { position, duration } = progress;

      if (duration > 0) {
        acc[item.id] = (position / duration) * 100; // Calculate percentage progress
      }
    }
    return acc;
  }, {});

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
            if(!isPlayerReady){
              return <CustomText>Loading.....</CustomText>
            }
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
                 <TouchableOpacity 
                  onPress={() => handlePlayPress(item.id, item.file)}
                 
                 >

                  <Icon
                  as={FontAwesome5}
                  name={currentTrack === item.id && playing.state === State.Playing ? 'pause' : 'play'}
                  color={'#BF55EC'}
                  size={moderateScale(14, 0.3)}
                  />
                  </TouchableOpacity>
                  </View>
                  <View style={styles.imageContainer}>
                    {/* <CustomImage
                      source={require('../Assets/Images/waves.png')}
                      style={[styles.image,  ]}
                      resizeMode={'contain'}
                    /> */}
                      <Progress 
                      style={{width:"100%", 
                      
                      alignSelf:"center"}}
                      colorScheme="secondary" value={
                        // `${duration > 0 ? (position / duration) * 100 : 0}`
                        trackProgresses[item.id] || 0
                        } />
                            {/* <View style={[styles.overlay, 
                              { width: `${duration > 0 ? (position / duration) * 100 : 0}%` }]}>
                                  <LinearGradient
            colors={['#BF55EC', '#FF3974']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
                              </View>  */}

                  </View>
                  <CustomText>  {currentTrack === item.id 
          ? `${format(position)} / ${format(duration)}` 
          : `00:00 / ${format(item.duration || 0)}`}</CustomText>
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
    // alignItems:"center",
    // backgroundColor:"red",
    // paddingVertical:11,
    justifyContent:"center",
    alignItems:"center"
    // overflow: 'hidden',
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
    // width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor:"#ff00001f"

  },
  gradient: {
    flex: 1,
    opacity:0.2
  }
});
