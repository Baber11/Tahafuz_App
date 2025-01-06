import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Icon, } from 'native-base'
import CustomText from '../Components/CustomText'
import Color from '../Assets/Utilities/Color'
import CustomImage from '../Components/CustomImage'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import CustomButton from '../Components/CustomButton'

const Profile = () => {
  const [name, setName] = useState('Emily Devis');
  // const [lastName,setLastName] = useState("")
  const [email, setEmail] = useState('abc@gmail.com');
  const [phoneNum, setPhoneNum] = useState('090078601');
  
  return (
    <>
        <Header 
        title={"My Profile"}
  
        textstyle={{fontWeight: "bold"}}
        showBack headerColor={"#FFECD0"}
        
        titleIcon={"user"} 
    titleIconType={FontAwesome6}
        headerRight={true}
        />
        {/* <ScrollView> */}
        <LinearGradient 
    colors={["#FFECD0","#FF3974CC"]}
    start={{x: 0.7, y:0.7 }}
    end={{x: 0.9, y:0.8 }}
    style={styles.main}
    >
        <View style={styles.mainSettings}>
          <>
        <View style={styles.profileImage}>
          <CustomImage 
          style={styles.image}
          source={{uri:"https://randomuser.me/api/portraits/women/4.jpg"}}
          />
        </View>
           <TouchableOpacity
              onPress={() => {
                // setShowModal(true);
              }}
              style={styles.edit}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.white}
                size={moderateScale(16, 0.3)}
              />
            </TouchableOpacity>
            </>

       <CustomText style={{fontSize:moderateScale(24,0.3)}} isBold>{name}</CustomText>
        <View style={styles.form}>
      
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
          backgroundColor={"#f7d29c"}
          borderColor={"#bd8024"}
          marginTop={moderateScale(12, 0.3)}
          color={"#d4850e"}
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
          backgroundColor={"#f7d29c"}
          marginTop={moderateScale(12, 0.3)}
          color={"#d4850e"}
          borderColor={"#bd8024"}
          placeholderColor={Color.white}
          borderRadius={moderateScale(10, 0.4)}
          // disable
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
          borderColor={"#bd8024"}
          backgroundColor={"#f7d29c"}

          marginTop={moderateScale(12, 0.3)}
          color={"#925f13"}
          placeholderColor={"#d4850e"}
          borderRadius={moderateScale(10, 0.4)}
          // disable
        />
           <CustomButton
        text={"Edit"}
        bgColor={"#FF3974CC"}
            borderColor={'white'}
            borderRadius={moderateScale(10, 0.4)}
            borderWidth={1}
            textColor={Color.white}
            onPress={() => {

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
    </LinearGradient>
    {/* </ScrollView> */}
    </>
  )
}

export default Profile

const styles = StyleSheet.create({

  
  main:{
    width: windowWidth,
    height: windowHeight * 0.9,
    alignItems:"center",
    // justifyContent:"center",
    // borderWidth:2,
    // borderColor:"red"
},
mainSettings:{
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    justifyContent:"center",
    alignItems:"center",
    paddingTop:moderateScale(12,0.2),
    backgroundColor:"rgba(255,255,255,0.35)",      
    gap:moderateScale(20,0.2),
    paddingHorizontal:moderateScale(20,0.2),
borderRadius:moderateScale(10,0.2),
borderWidth:1,
borderColor:"rgba(255, 255, 255, 0.19)"

},
profileImage:{
  width: windowWidth * 0.35,
  height: windowWidth * 0.35,
  overflow: "hidden",
  borderRadius: (windowWidth * 0.35) / 2
},
image:{
  width:"100%",
  height:"100%"
},
edit: {
  backgroundColor: "#FF3974CC",
  width: moderateScale(25, 0.3),
  height: moderateScale(25, 0.3),
  position: 'absolute',
  top:moderateScale(175,0.2),
  // bottom: moderateScale(5, 0.3),
  right: moderateScale(120, 0.3),
  borderRadius: moderateScale(12.5, 0.3),
  elevation: 8,
  zIndex:1,
  justifyContent: 'center',
  alignItems: 'center',
},
})