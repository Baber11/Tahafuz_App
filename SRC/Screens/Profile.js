import { ActivityIndicator, FlatList, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
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
import { useDispatch, useSelector } from 'react-redux'
import ImagePickerModal from '../Components/ImagePickerModal'
import { Post } from '../Axios/AxiosInterceptorFunction'
import { setUserData } from '../Store/slices/common'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData= useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ Profile ~ userData:", JSON.stringify(userData,null,2));
  const [name, setName] = useState(userData?.full_name ?? "");
  const [email, setEmail] = useState(userData?.email ?? "");
  const [phoneNum, setPhoneNum] = useState(userData?.phone ?? "");
  const [photo, setPhoto] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  
  const updateProfile = async () =>{
    const url="auth/profile";
    const body = {
      full_name:name,
      phone: phoneNum
    };
    
    const formData = new FormData();
    
    for (let key in body){
      if(body[key] == " "){
        return ToastAndroid.show(`${key} must not be empty.`, ToastAndroid.SHORT);
      } else{
        formData.append(key, body[key]);
      }
    }
    if(Object.keys(photo).length > 0){
      formData.append("photo", photo);
    }
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if(response != undefined ){
      dispatch(setUserData(response?.data?.user_info))
      ToastAndroid.show("Profile UPdated Successfully!", ToastAndroid.SHORT);
      navigation.goBack();
      console.log("🚀 ~ updateProfile ~ response:", JSON.stringify(response?.data,null,2)); 
    }

  }

  
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
        <View>
        <View style={styles.profileImage}>
          <CustomImage 
          style={styles.image}
          source={{uri: Object.keys(photo).length == 0 ? userData?.photo :  photo?.uri}}
          />
        </View>                
           <TouchableOpacity
              onPress={() => {
                setShowModal(true);
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
          </View>  
            

       <CustomText style={{fontSize:moderateScale(24,0.3)}} isBold>{userData?.full_name}</CustomText>
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
          disable
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
          color={"#bd8024"}
          placeholderColor={"#d4850e"}
          borderRadius={moderateScale(10, 0.4)}
        />
           <CustomButton
        text={ isLoading ? <ActivityIndicator color={"white"} size={moderateScale(24,0.3)}/> : "Edit"}
        bgColor={"#FF3974CC"}
            borderColor={'white'}
            borderRadius={moderateScale(10, 0.4)}
            borderWidth={1}
            textColor={Color.white}
            onPress={() => {
              updateProfile()
            }}
            width={windowWidth * 0.35}
            height={windowHeight * 0.06}
            fontSize={moderateScale(24, 0.3)}
            textTransform={'none'}
            isGradient={false}
            isBold
            marginTop={moderateScale(30, 0.3)}
            disabled={isLoading}
        />
        </View>
        </View>
    </LinearGradient>
    <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setPhoto}
        />
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
  width: moderateScale(30, 0.3),
  height: moderateScale(30, 0.3),
  // position: 'absolute',
  top:moderateScale(-25,0.2),
  // bottom: moderateScale(5, 0.3),
  right: moderateScale(-80, 0.3),
  borderRadius: moderateScale(15, 0.3),
  elevation: 8,
  zIndex:1,
  justifyContent: 'center',
  alignItems: 'center',
},
})