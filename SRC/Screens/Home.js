import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { moderateScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import LinearGradient from 'react-native-linear-gradient'
import CustomText from '../Components/CustomText'
import CustomImage from '../Components/CustomImage'
import CustomButton from '../Components/CustomButton'
import GetLocation from "react-native-get-location";
import { useDispatch } from 'react-redux';
import {setLocation} from "../Store/slices/common";


const Home = () => {
    const dispatch = useDispatch();

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
      useEffect(() => {
        console.log("Running....")
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            dispatch(setLocation({
                lat: location.latitude,
                lng:location.longitude
            }))
            console.log(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
      }, [])
      
      
  return (
    <>
    <Header title={"We Admire"} 
    textstyle={{ 
        fontSize:moderateScale(14,0.2)
    }}
    headerStyle={{
        height:windowHeight * 0.07
    }}
    headerColor={"#FFECD0"}
    headerRight horizontalDots={true}/>
      <LinearGradient 
        colors={["#FFECD0","#FF3974CC"]}
        start={{x: 0.7, y:0.7 }}
        end={{x: 0.9, y:0.8 }}
        style={styles.main}
        >
        <CustomText style={styles.title} isBold>Your Strong Personality.</CustomText>
            <View style={styles.card}>
                <View style={styles.textContainer}>
                    <CustomText style={styles.txt} isBold>Be</CustomText>
                    <CustomText style={styles.txt2} isBold>Productive</CustomText>
                </View>
                <View style={styles.imgContainer}>
                <CustomImage
                resizeMode={"contain"}
                source={require("../Assets/Images/illustration4.png")}
                style={styles.image}
                />
                </View>
            </View>
       <View style={styles.emergencyTextView}>

        <CustomText style={styles.title} isBold>Emergency</CustomText>
        <CustomText style={styles.more} isBold>See More</CustomText>
       </View>
            <LinearGradient 
            colors={["#FC4A1ACC", "#F7B733CC"]}
            start={{x:0.5, y:0.1}}
            end={{x:0.6, y:0.5}}
            
            style={styles.emergencyCard}>
                <CustomImage
                source={require("../Assets/Images/Alert.png")}
                // style={{width: mod}}
                />
               <CustomText style={{color: Color.white,}} isBold>Active Emergency</CustomText>
               <CustomText style={{color: Color.white,}} isBold>Call 1-5 for Emergency</CustomText>
               <CustomButton
                       text={"1 - 5"}
                       alignSelf="flex-start"
                       bgColor={Color.white}
                           borderColor={'white'}
                           borderRadius={moderateScale(24, 0.4)}
                           borderWidth={1}
                           textColor={"#FC4A1ACC"}
                           onPress={() => {

                           }}
                           width={windowWidth * 0.2}
                           height={windowHeight * 0.04}
                           fontSize={moderateScale(24, 0.3)}
                           textTransform={'none'}
                           isGradient={false}
                           isBold
                        //    marginTop={moderateScale(30, 0.3)}
               />
            </LinearGradient>

        <CustomText style={styles.title} isBold>Explore Live Safe</CustomText>
            <View style={styles.exploerView}>
              {data.map((item, index) =>{
                return(
                    <View key={index} style={styles.exploreItem}>

                <View style={styles.exploreCard}>
                     <CustomImage source={item.image}/>
                </View>
                <CustomText>{item.title}</CustomText>
                </View>
                )
              })}
            </View>
        </LinearGradient>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
    main:{
        width: windowWidth,
        height: windowHeight * 0.93,
        paddingHorizontal:moderateScale(22,0.2)
        // alignItems:"center",
    },
    title:{
        fontSize:moderateScale(25,0.3),

    },
    emergencyTextView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    more:{
        fontSize:moderateScale(16,0.2),
        color:"#3059DE"
    },
    card:{
        width: windowWidth * 0.85,
        backgroundColor:Color.white,
        flexDirection:"row",
        alignSelf:"center",
        gap:moderateScale(10,0.2),
        justifyContent:"center",
     marginTop:moderateScale(10,0.2),
        // paddingVertical:moderateScale(15,0.2),
        overflow:"hidden",
        borderRadius:moderateScale(20,0.3)
    },
    emergencyCard:{

        width: windowWidth * 0.65,
        backgroundColor:Color.white,
        flexDirection:"Column",
        alignSelf:"center",
        // alignItems:"center",
        paddingHorizontal:moderateScale(12,0.2),
        gap:moderateScale(5,0.2),
        alignItems:"flex-start",
        
     marginTop:moderateScale(10,0.2),
        paddingVertical:moderateScale(15,0.2),
        overflow:"hidden",
        borderRadius:moderateScale(20,0.3)
    },
    textContainer:{
        width: windowWidth * 0.34,
        justifyContent:"center",
        marginLeftLeft: moderateScale(12,0.2),
        paddingLeft:moderateScale(17,0.2)
    },
    txt:{
        fontSize:moderateScale(25,0.23)
    },
    txt2:{
        width: "100%",
        fontSize:moderateScale(23,0.2)
    },
    imgContainer:{
        width: windowWidth * 0.5,
        height: windowHeight * 0.2,
        overflow:"hidden",
    },
    image:{
        width: "100%",
        height:"100%"
    },
    exploreCard:{
        width: windowWidth * 0.14,
        height: windowWidth * 0.14,
        backgroundColor:Color.white,
        borderRadius:moderateScale(8,0.3),
        alignItems:"center",
        justifyContent:"center",
        elevation:5,
    },
    exploreItem:{
        width: windowWidth * 0.24,
        gap:moderateScale(5,0.2),
        alignItems:"center",
        justifyContent:"center",
        // backgroundColor:"red"
    },
    exploerView:{
        width: windowWidth * 0.,
        flexDirection:"row",
        marginTop:moderateScale(22,0.3)

    }
})