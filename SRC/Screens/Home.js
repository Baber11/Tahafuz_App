import React, { useEffect } from 'react';
import { FlatList, Linking, StyleSheet, View } from 'react-native';
import GetLocation from 'react-native-get-location';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { setLocation } from '../Store/slices/common';
import { windowHeight, windowWidth } from '../Utillity/utils';


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      console.log('Running....');
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
      timeout: 60000,
    })
    .then(location => {
        dispatch(
            setLocation({
            lat: location.latitude,
            lng: location.longitude,
        }),
        );
        console.log(location);
    })
    .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
    });
  }, []);
  
  const data = [
    {
      id: 1,
      title: 'Hospitals',
      image: require('../Assets/Images/RedCross.png'), // Replace with your actual path
    },
    {
      id: 2,
      title: 'Medicine',
      image: require('../Assets/Images/Pills.png'), // Replace with your actual path
    },
    {
      id: 3,
      title: 'Bus Stop',
      image: require('../Assets/Images/bus.png'), // Replace with your actual path
    },
    {
      id: 4,
      title: 'Police',
      image: require('../Assets/Images/police.png'), // Replace with your actual path
    },
  ];


  return (
    <>
      <Header
        title={'We Admire'}
        textstyle={{
          fontSize: moderateScale(14, 0.2),
        }}
        headerStyle={{
          height: windowHeight * 0.07,
        }}
        headerColor={'#FFECD0'}
        headerRight
        horizontalDots={true}
      />
      <LinearGradient
        colors={['#FFECD0', '#FF3974CC']}
        start={{x: 0.7, y: 0.7}}
        end={{x: 0.9, y: 0.8}}
        style={styles.main}>
        <CustomText style={styles.title} isBold>
          Your Strong Personality.
        </CustomText>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <CustomText style={styles.txt} isBold>
              Be
            </CustomText>
            <CustomText style={styles.txt2} isBold>
              Productive
            </CustomText>
          </View>
          <View style={styles.imgContainer}>
            <CustomImage
              resizeMode={'contain'}
              source={require('../Assets/Images/illustration4.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.emergencyTextView}>
          <CustomText style={styles.title} isBold>
            Emergency
          </CustomText>
          <CustomText style={styles.more} isBold>
            See More
          </CustomText>
        </View>
       <View style={{paddingVertical:moderateScale(30,0.2)}}>
        <FlatList
              contentContainerStyle={{
                gap:moderateScale(20,0.2),
                }}  
              horizontal
                data={[15, 115, 1020, 16, 1101, 915]}
              renderItem={({item, index})=>{
                return(
                  <LinearGradient
                  colors={['#FC4A1ACC', '#F7B733CC']}
                  start={{x: 0.5, y: 0.1}}
                  end={{x: 0.6, y: 0.5}}
                  
                  style={styles.emergencyCard}>
                  <CustomImage
                    source={require('../Assets/Images/Alert.png')}
                    // style={{width: mod}}
                  />
                  <CustomText style={{color: Color.white}} isBold>
                    Active Emergency
                  </CustomText>
                  <CustomText style={{color: Color.white}} isBold>
                    Call 1-5 for Emergency
                  </CustomText>
                  <View style={styles.emergencyNumbContainer}>
                    
                      <CustomButton
                        text={item}
                        alignSelf="flex-start"
                        bgColor={Color.white}
                        borderColor={'white'}
                        borderRadius={moderateScale(24, 0.4)}
                        borderWidth={1}
                        textColor={'#FC4A1ACC'}
                        onPress={() => {
                          const url = `tel:${item}`;
                          Linking.openURL(url).catch(err =>
                            console.error('Failed to open dial pad:', err),
                          );
                        }}
                        width={windowWidth * 0.2}
                        height={windowHeight * 0.04}
                        fontSize={moderateScale(24, 0.3)}
                        textTransform={'none'}
                        isGradient={false}
                        isBold
                        //    marginTop={moderateScale(30, 0.3)}
                      />
                    
                  </View>
                </LinearGradient>
                )
              }}
              
            />
        </View> 
      

        <CustomText style={styles.title} isBold>
          Explore Live Safe
        </CustomText>
        <View style={styles.exploerView}>
          {data.map((item, index) => {
            return (
              <View key={index} style={styles.exploreItem}>
                <View style={styles.exploreCard}>
                  <CustomImage source={item.image} />
                </View>
                <CustomText>{item.title}</CustomText>
              </View>
            );
          })}
        </View>
      </LinearGradient>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight * 0.93,
    paddingHorizontal: moderateScale(22, 0.2),
    // alignItems:"center",
  },
  title: {
    fontSize: moderateScale(25, 0.3),
  },
  emergencyTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  more: {
    fontSize: moderateScale(16, 0.2),
    color: '#3059DE',
  },
  card: {
    width: windowWidth * 0.85,
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: moderateScale(10, 0.2),
    justifyContent: 'center',
    // alignItems:"center",
    marginTop: moderateScale(10, 0.2),
    // paddingVertical:moderateScale(15,0.2),
    overflow: 'hidden',
    borderRadius: moderateScale(20, 0.3),
  },
  emergencyCard: {
    width: windowWidth * 0.65,
    backgroundColor: Color.white,
    flexDirection: 'Column',
    alignSelf: 'center',
    // alignItems:"center",
    paddingHorizontal: moderateScale(12, 0.2),
    gap: moderateScale(5, 0.2),
    alignItems: 'flex-start',

    marginTop: moderateScale(10, 0.2),
    paddingVertical: moderateScale(15, 0.2),
    overflow: 'hidden',
    borderRadius: moderateScale(20, 0.3),
  },
  textContainer: {
    width: "45%",
    justifyContent: 'center',
    marginLeftLeft: moderateScale(12, 0.2),
    paddingLeft: moderateScale(17, 0.2),
  },
  txt: {
    fontSize: moderateScale(25, 0.23),
  },
  txt2: {
    width: '100%',
    fontSize: moderateScale(23, 0.2),
  },
  imgContainer: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  exploreCard: {
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    backgroundColor: Color.white,
    borderRadius: moderateScale(8, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  exploreItem: {
    width: windowWidth * 0.24,
    gap: moderateScale(5, 0.2),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  exploerView: {
    width: windowWidth * 0,
    flexDirection: 'row',
    marginTop: moderateScale(22, 0.3),
  },
  emergencyNumbContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(12, 0.2),
  },
});
