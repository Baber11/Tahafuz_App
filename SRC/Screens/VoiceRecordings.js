import { Icon, Progress } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { addTracks, setupPlayer } from '../Utillity/trackPlayerServices';
import { windowHeight, windowWidth } from '../Utillity/utils';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setRecordings } from '../Store/slices/common';
import { CurrentRenderContext, useIsFocused } from '@react-navigation/native';



const audioRecorderPlayer = new AudioRecorderPlayer();
// audioRecorderPlayer.setSubscriptionDuration(0.1)
const VoiceRecordings = () => {
  // const [isPlaying, setIsPlaying] = useState(false);
const dispatch = useDispatch();
const isFocused= useIsFocused();
const recordings = useSelector(state => state.commonReducer.recordings);
  // console.log("🚀 ~ VoiceRecordings ~ recordings:", recordings)
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState(null);
  const [currentPositionSec, setCurrentPositionSec] = useState(0); // Current playback position
  const [durationSec, setDurationSec] = useState(0); // Total audio duration
  const [isPlaying, setIsPlaying] = useState(false); // Audio playing state
  const [isPause, setIsPause] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
    const [currentAudioId ,setCurrentAudioId] = useState(null); // Track currently playing
 console.log("RUNNING AGAIN")

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      console.log('Recording started:', result);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recorder:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      console.log('Recording stopped:', result);
      setRecordedFilePath(result);
      setIsRecording(false);
      const audioFileObject={
        id: Date.now().toString(),
        audioFile: result
      }
      dispatch(setRecordings(audioFileObject));
    } catch (error) {
      console.error('Error stopping recorder:', error);
    }
  };
  const playRecording = async (filePath) => {
    try {
      await audioRecorderPlayer.startPlayer(filePath);
      // if(filePath != undefined){
        audioRecorderPlayer.addPlayBackListener((e) => {
          // console.log('Playing:', e.currentPosition);
          setCurrentPositionSec(e.currentPosition);
        setDurationSec(e.duration);
        setDuration(audioRecorderPlayer.mmssss(e.duration));
        setPlayTime(audioRecorderPlayer.mmssss(e.currentPosition));
        if (e.currentPosition == e.duration) {
          console.log("Running")
          audioRecorderPlayer.stopPlayer();
          audioRecorderPlayer.removePlayBackListener();
          setIsPlaying(false);
          setCurrentPositionSec(0);
          setCurrentAudioId("");
        }
      });
    // }

      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing recording:', error);
    }
  };
  
    const handlePlayPress = (trackId, filePath) => {
   console.log(trackId, filePath, currentAudioId, isPause, isPlaying);
      if ((currentAudioId == trackId) && isPlaying) {
        audioRecorderPlayer.pausePlayer();
        // audioRecorderPlayer.
        setIsPause(true);
        setIsPlaying(false);
      }
      else if(isPause) {
        audioRecorderPlayer.resumePlayer();
        setIsPause(false);
        setIsPlaying(true);
      } else {
        // Stop the current track if another one is being played
        if (currentAudioId !== null) {
          audioRecorderPlayer.stopPlayer();
          setIsPlaying(false);
          setCurrentPositionSec(0);
        }
        console.log("Running")
        // Play the new track
        setCurrentAudioId(trackId);
        playRecording(filePath);
      }
    };
    // async function handlePlayPress(trackId, trackFile) {
    //   if (currentTrack === trackId && playing.state === State.Playing) {
    //     await TrackPlayer.pause();
    //   } else {
    //     if (playing.state === State.Playing || playing.state === State.Paused) {
    //       await TrackPlayer.stop();
    //     }

    //     await TrackPlayer.reset();
        
    //     await TrackPlayer.add({
    //       id: trackId.toString(),
    //       url: trackFile, 
    //       title: `Track ${trackId}`,
    //       artist: 'Artist Name',
    //     });
    //     await TrackPlayer.play();
    //     setCurrentTrack(trackId);  
    //   }
    // }
  // useEffect(()=>{
  //   console.log("RUNNING => ", isPlaying, isRecording, currentPositionSec)
  //   setCurrentAudioId('');
  //   audioRecorderPlayer.removePlayBackListener();

  // },[isFocused])

    
    const formatTime = (milliseconds) => {
      const duration = moment.duration(milliseconds);
      const minutes = duration.minutes().toString().padStart(2, '0');
      const seconds = duration.seconds().toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };
   
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


  return (
    <>
      <Header
        title={'Voice Recordings'}
        titleImage={require('../Assets/Images/Waveform.png')}
        textstyle={{fontWeight: 'bold'}}
        showBack={false}
        headerColor={'#FFECD0'}
      />
      <LinearGradient
        colors={['#FFECD0', '#FF3974CC']}
        start={{x: 0.7, y: 0.7}}
        end={{x: 0.9, y: 0.8}}
        style={styles.main}>
        <View style={styles.mainVoiceRecordings}>
          <FlatList
            data={recordings}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              // backgroundColor:"red",
              paddingHorizontal:moderateScale(11,0.2),
              alignItems:"center", justifyContent:"center"}}
            renderItem ={({item}) =>{
              return (
                <>
                <View style={styles.senderInfoContaier}>
                  <View style={styles.userView}>
                    <CustomText style={styles.letter} isBold>
                      {"M"}
                    </CustomText>
                  </View>
                  <CustomText>{"12/02/2025"}</CustomText>
                </View>
                <View style={styles.ListTile}>
                  {/* <View > */}
                 <TouchableOpacity 
                 style={styles.leading}
                //  onPress={() => handlePlayPress(item.id, item.file)}
                  onPress={() => {
                    
                    handlePlayPress(item.id, item.audioFile)
                  }}
                 
                 >

                  <Icon
                  as={FontAwesome5}
                  name={currentAudioId === item.id && isPlaying ? 'pause' : 'play'}
                  color={'#BF55EC'}
                  size={moderateScale(14, 0.3)}
                  />
                  </TouchableOpacity>
                  <View style={styles.imageContainer}>
                 
                      <Progress 
                      style={{width:"100%", 
                      alignSelf:"center"}}
                      colorScheme="secondary" value={ 
                       currentAudioId == item.id ? 
                        (currentPositionSec / durationSec) * 100 : 0} 
                      />

                  </View><CustomText>{`${playTime.toString().slice(0,5)} / ${duration.toString().slice(0,5)}`}</CustomText>
                  {/* <CustomText style={{fontSize:moderateScale(11,0.2)}}>  {currentTrack === item.id 
          ? `${format(currentPositionSec)} / ${format(durationSec)}` 
          : `00:00 / ${format(item.duration || 0)}`}</CustomText> */}
                </View>
              </>
                );
            }}
              />
        
        
        <TouchableOpacity style={styles.FAB} onPress={()=>{
       isRecording ? stopRecording() : startRecording() 
}}>
          <Icon 
          name={isRecording ? "stop-circle-outline" : "mic-sharp"}
          as={Ionicons}
          size={moderateScale(21,0.2)}
          color={Color.white} 
          />
         </TouchableOpacity>
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
    gap: moderateScale(29, 0.2),
    // paddingHorizontal: moderateScale(10, 0.2),
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
    alignSelf:"center",
    elevation: 5,
    marginTop:moderateScale(10,0.2),
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
    marginTop:moderateScale(4,0.1),
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
    width: windowWidth * 0.35,
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
  FAB:{
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderRadius:(windowWidth * 0.12) /2,
    backgroundColor:"#FF3974",
    justifyContent:"center",
    alignItems:"center",
    elevatio:10,
    position:"absolute",
    right:moderateScale(12,0.2),
    bottom:moderateScale(34,0.2)
  
  
  },
  gradient: {
    flex: 1,
    opacity:0.2
  }
});
