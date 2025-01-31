import {DeleteIcon, Icon, Progress} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import * as Animateable from 'react-native-animatable';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {addTracks, setupPlayer} from '../Utillity/trackPlayerServices';
import {windowHeight, windowWidth} from '../Utillity/utils';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAllRecordings, setRecordings} from '../Store/slices/common';
import {CurrentRenderContext, useIsFocused} from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import CustomImage from '../Components/CustomImage';

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.5);
const VoiceRecordings = () => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const recordings = useSelector(state => state.commonReducer.recordings);
  console.log("🚀 ~ VoiceRecordings ~ recordings:", recordings)
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState(null);
  const [currentPositionSec, setCurrentPositionSec] = useState(0); // Current playback position
  const [durationSec, setDurationSec] = useState(0); // Total audio duration
  const [isPlaying, setIsPlaying] = useState(false); // Audio playing state
  const [recordingDuration,setRecordingDuration] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [animationShown, setAnimationShown] = useState(false);
  
  const [duration, setDuration] = useState(0);
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const [finishedPlayerSubscription, setFinishedPlayerSubscription] =
    useState(null);
  // Track currently playing
  //  console.log("RUNNING AGAIN")
  const startRecording = async () => {
    audioRecorderPlayer.removeRecordBackListener();
   await audioRecorderPlayer.stopRecorder()
    try {
      const result = await audioRecorderPlayer.startRecorder();
      console.log('Recording started:', result);
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordingDuration(e.currentPosition);
        console.log('🚀 ~ startRecording ~ e:', e.currentPosition);
      });
      setAnimationShown(true)
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recorder:', error);
    }
  };

  const stopRecording = async () => {
    try {
      audioRecorderPlayer.removeRecordBackListener();
      const result = await audioRecorderPlayer.stopRecorder();
      console.log('Recording stopped:', result);
      setRecordedFilePath(result);
      setIsRecording(false);
      const durationt = moment.duration(recordingDuration, 'milliseconds');
      
const date = new Date();
const formattedDate = moment(date).format('DD/MM/YYYY');
      const audioFileObject = {
        id: Date.now().toString(),
        audioFile: result,
        duration:moment.utc(durationt.asMilliseconds()).format("mm:ss"),
        date:formattedDate
      };
      setTimeout(() => setAnimationShown(false) , 200)
      dispatch(setRecordings(audioFileObject));
    } catch (error) {
      console.error('Error stopping recorder:', error);
    }
  };
  const playRecording = async filePath => {
    console.log("🚀 ~ VoiceRecordings ~ filePath:", filePath)
    try {
      console.log('Start Recording Function RUNS..');
      
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();

      console.log('Start Recording Function RESET..');

      await audioRecorderPlayer.startPlayer(filePath);
      console.log('Start Recording Function STARTS..');
      // if(filePath != undefined){

      // audioRecorderPlayer.removePlayBackListener();
      audioRecorderPlayer.addPlayBackListener(e => {
        // console.log("🚀 ~ audioRecorderPlayer.addPlayBackListener ~ e:", e)
        console.log('Playing:', e.currentPosition, e.duration);
        setCurrentPositionSec(e.currentPosition);
        setDurationSec(e.duration);
        setDuration(audioRecorderPlayer.mmssss(e.duration));
        setPlayTime(audioRecorderPlayer.mmss(e.currentPosition));
        // if (e.isFinished) {
        if (e.currentPosition >= e.duration) {
          console.log('Running');
          audioRecorderPlayer.stopPlayer();
          audioRecorderPlayer.removePlayBackListener();
          setIsPlaying(false);
          setCurrentPositionSec(0);
          setCurrentAudioId('');
        }
      });
      // }

      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing recording:', error);
    }
  };
  // const playRecording = async (filePath) => {
  //   try {
  //     // SoundPlayer.playSoundFile(filePath);
  //     const cleanedPath = filePath.replace('file://', '');

  //   // Stop any currently playing audio before starting a new one
  //   SoundPlayer.stop();
  //   await SoundPlayer.loadUrl(cleanedPath);
  //   SoundPlayer.onFinishedLoading((success) => {
  //     if (success) {
  //       SoundPlayer.play();
  //       setIsPlaying(true);
  //     } else {
  //       console.error("Failed to load audio");
  //     }
  //   });
  //   // Load and play the audio from the local file
  //   // SoundPlayer.loadUrl(cleanedPath); // Use cleaned path
  //   SoundPlayer.play();
  //   const audio = await SoundPlayer.getInfo();
  //   setDurationSec(audio?.duration)
  //   console.log(audio?.duration);

  //   // }

  //     setIsPlaying(true);
  //   } catch (error) {
  //     console.error('Error playing recording:', error);
  //   }
  // };

  const handlePlayPress = async (trackId, filePath) => {
    console.log(trackId, filePath, currentAudioId, isPause, isPlaying);
    try {
      if (currentAudioId == trackId && isPlaying) {
        const pause = await audioRecorderPlayer.pausePlayer();
        // const stop = await audioRecorderPlayer.stopPlayer();
        console.log(
          'Pause Player block, ',
          currentAudioId,
          pause,
          trackId,
          isPlaying,
        );
        setIsPause(true);

        setIsPlaying(false);
      } else if (isPause) {
        const resume = await audioRecorderPlayer.resumePlayer();
        console.log(
          'Pause Player block, ',
          currentAudioId,
          resume,
          trackId,
          isPlaying,
        );

        setIsPause(false);
        setIsPlaying(true);
      } else {
        // Stop the current track if another one is being played
        if (currentAudioId !== null) {
          await audioRecorderPlayer.stopPlayer();
          setIsPlaying(false);
          setCurrentPositionSec(0);
        }
        console.log('Running');
        // Play the new track
        setCurrentAudioId(trackId);
        await playRecording(filePath);
      }
    } catch (error) {
      console.log('🚀 ~ handlePlayPress ~ error:', error);
    }
  };

  useEffect(() => {
    console.log('RUNNING => ', isPlaying, isRecording, currentPositionSec);
    // setCurrentAudioId('');
    // _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
    //   'FinishedPlaying',
    //   ({success}) => {
    //     if (success) {
    //       setIsPlaying(false);
    //       setCurrentAudioId(null);
    //     }
    //     console.log('finished playing', success);
    //   },
    // );

    setIsPlaying(false);
    setIsPause(false);
    audioRecorderPlayer.removePlayBackListener();
    return () => {
      setIsPlaying(false);
      setCurrentAudioId(null);
      // _onFinishedPlayingSubscription.remove();
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, [isFocused]);

  const formatTime = milliseconds => {
    const duration = moment.duration(milliseconds);
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const durationt = moment.duration(recordingDuration, 'milliseconds');

  // Format as mm:ss
  const formattedTime = moment.utc(durationt.asMilliseconds()).format("mm:ss");

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
     {recordings?.length > 0 &&   <CustomText  isBold
        style={{width: "100%", textAlign:"right", marginRight: moderateScale(10,  0.2)}}
        onPress={()=>{
          dispatch(deleteAllRecordings())
        }}
    >Clear All</CustomText>}
          <FlatList
            data={recordings}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // backgroundColor:"red",
              paddingHorizontal: moderateScale(11, 0.2),
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom:moderateScale(20,0.2)
            }}
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.senderInfoContaier}>
                    <View style={styles.userView}>
                      <CustomText style={styles.letter} isBold>
                        {'M'}
                      </CustomText>
                    </View>
                    <CustomText>{item.date}</CustomText>
                  </View>
                  <View style={styles.ListTile}>
                    {/* <View > */}
                    <TouchableOpacity
                      style={styles.leading}
                      onPress={() => {
                        handlePlayPress(item.id, item.audioFile);
                      }}>
                      <Icon
                        as={FontAwesome5}
                        name={
                          currentAudioId === item.id && isPlaying
                            ? 'pause'
                            : 'play'
                        }
                        color={'#BF55EC'}
                        size={moderateScale(14, 0.3)}
                      />
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                      <Progress
                        style={{width: '100%', alignSelf: 'center'}}
                        colorScheme="secondary"
                        value={
                          currentAudioId == item.id
                            ? (currentPositionSec / durationSec) * 100
                            : 0
                        }
                      />
                    </View>
                    {/* <CustomText>{`${playTime.toString()} / ${duration.toString()}`}</CustomText> */}
                    <CustomText style={{fontSize: moderateScale(11, 0.2)}}>
                      {' '}
                      {currentAudioId === item.id
                        ? `${formatTime(currentPositionSec)} / ${item.duration}`
                        : `00:00 / ${item.duration}`}
                    </CustomText>
                  </View>
                </>
              );
            }}
            ListEmptyComponent={()=>{
              return (
                <View style={{width: "100%", 
                paddingHorizontal:moderateScale(20,0.2),
                height: windowHeight * 0.67,
                gap:moderateScale(20,0.2), 
                // backgroundColor:"red",
                alignItems:"center", justifyContent:"center"}}>
                  <View style={{width: windowWidth * 0.3, height: windowWidth * 0.3, overflow:"hidden"}}>
                  <CustomImage 
                  style={{width:"100%", height:"100%"}}
                  source={require("../Assets/Images/mic.png")}/>
                  </View>  
                  <CustomText isBold>No Audios recorded yet.</CustomText>
                </View>
              )
             }}
          />
          <>
{animationShown && <Animateable.View  
animation={isRecording ?  { from: { translateX:moderateScale(50, 0.2) }, to: { translateX: 0 } } : { from: { translateX:0 }, to: { translateX: moderateScale(52,0.2) }}}
// easing={"ease-in-out"}
// iterationCount={"2"}
duration={700}
style={styles.recordeingTimer}>
  <CustomText isBold>{formattedTime}</CustomText>
</Animateable.View>}
          <TouchableOpacity
            style={[styles.FAB, isRecording && {    width: windowWidth * 0.17,
              height: windowWidth * 0.17,
              borderRadius: (windowWidth * 0.17) / 2,}]}
            onPress={() => {
              isRecording ? stopRecording() : startRecording();
            }}>
            <Icon
              name={isRecording ? 'stop-circle-outline' : 'mic-sharp'}
              as={Ionicons}
              size={moderateScale(21, 0.2)}
              color={Color.white}
              />
          </TouchableOpacity>

</>
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
    alignSelf: 'center',
    elevation: 5,
    marginTop: moderateScale(10, 0.2),
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
    marginTop: moderateScale(4, 0.1),
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
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#ff00001f',
  },
  FAB: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    backgroundColor: '#FF3974',
    justifyContent: 'center',
    alignItems: 'center',
    elevatio: 10,
    position: 'absolute',
    zIndex:1,
    right: moderateScale(12, 0.2),
    bottom: moderateScale(34, 0.2),
  },
  gradient: {
    flex: 1,
    opacity: 0.2,
  },
  recordeingTimer:{backgroundColor: "#f5a9e8", 

  paddingHorizontal:moderateScale(20,0.3),
  // zIndex:-1,
  paddingVertical:moderateScale(15,0.2),position: 'absolute',
  borderTopLeftRadius:moderateScale(15,0.2),
  borderBottomLeftRadius:moderateScale(15,0.2),
      right: moderateScale(65, 0.2),
      bottom: moderateScale(38, 0.2),}
});
// const VoiceRecordingsArray = [
//   {
//     id: 1,
//     date: '11/20/2024',
//     letter: 'M',
//     // iconName:"lock-outline",
//     // iconType: MaterialIcons,
//     file: require('../Assets/audio/sample1.mp3'),
//     onPress: () => {},
//   },
//   {
//     id: 2,
//     date: '11/20/2024',
//     letter: 'M',
//     iconType: Octicons,
//     file: require('../Assets/audio/sample2.mp3'),
//     onPress: () => {
//       // navigation.navigate('SafetyAtWork');
//     },
//   },
//   {
//     id: 3,
//     date: '11/20/2024',
//     letter: 'M',
//     iconType: MaterialCommunityIcons,
//     file: require('../Assets/audio/sample1.mp3'),
//     onPress: () => {},
//   },
// ];