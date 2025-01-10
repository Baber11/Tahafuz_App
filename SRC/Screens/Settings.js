import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import CustomText from '../Components/CustomText'
import { windowHeight, windowWidth } from '../Utillity/utils';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from 'native-base'
import Color from '../Assets/Utilities/Color'
import Header from '../Components/Header'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setUserToken } from '../Store/slices/auth'
import CustomImage from '../Components/CustomImage'
import { setUserData } from '../Store/slices/common'

const Settings = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData= useSelector(state => state.commonReducer.userData);

  const settingsArray =[
    {
    id:1,
    name:"Privacy",
    iconName:"lock-outline",
    iconType: MaterialIcons,
    onPress: () =>{}
  },
    {
    id:2,
    name:"Security",
    iconName:"shield-check",
    iconType: Octicons,
    onPress: () =>{
      navigation.navigate("SafetyAtWork")
    }
  },
    {
    id:3,
    name:"My Profile",
    iconName:"account-box-outline",
    iconType: MaterialCommunityIcons,
    onPress: () =>{
      navigation.navigate("Profile")
    }
  },
    {
    id:4,
    name:"Change Password",
    iconName:"key-outline",
    iconType: Ionicons,
    onPress: () =>{
      navigation.navigate("ChangePassword")
    }
  },
    {
    id:5,
    name:"About",
    iconName:"exclamationcircleo",
    iconType: AntDesign,
    onPress: () =>{}
  },
    {
    id:6,
    name:"Logout",
    iconName:"logout",
    iconType: MaterialCommunityIcons,
    onPress: () =>{
      dispatch(setUserData({}))
      dispatch(setUserToken(null))
    }
  }
]
    return (
    <>
        <Header 
        title={"Settings"}
        titleIcon={"settings-outline"}
        titleIconType={Ionicons}
        textstyle={{fontWeight: "bold"}}
        showBack={false} headerColor={"#FFECD0"}
        headerRight
        />
    <LinearGradient 
    colors={["#FFECD0","#FF3974CC"]}
    start={{x: 0.7, y:0.7 }}
    end={{x: 0.9, y:0.8 }}
    style={styles.main}
    >
        <View style={styles.mainSettings}>
        <View style={styles.profileImage}>
          <CustomImage 
          style={styles.image}
          source={{uri:userData?.photo}}
          />
        </View>
         {settingsArray.map((item,index) =>{
            return(
                <TouchableOpacity
                onPress={item?.onPress}
                style={styles.ListTile}>
                    <View style={styles.leading}>
                     <Icon as={item?.iconType} name={item.iconName} 
                     color={Color.white}
                     size={moderateScale(24,0.3)}/> 
                    </View>
                    <CustomText style={styles.title} isBold>{item.name}</CustomText>
                </TouchableOpacity>       
            )
         })   
         
         
            }
        </View>
    </LinearGradient>
  </>
  )
}

export default Settings

const styles = StyleSheet.create({
    main:{
        width: windowWidth,
        height: windowHeight * 0.9,
        alignItems:"center",
        justifyContent:"center"
    },
    mainSettings:{
        width: windowWidth * 0.9,
        height: windowHeight * 0.8,
        paddingTop:moderateScale(12,0.2),
        backgroundColor:"rgba(255,255,255,0.35)",      
        gap:moderateScale(20,0.2),
        paddingHorizontal:moderateScale(20,0.2),
    borderRadius:moderateScale(10,0.2),
    borderWidth:1,
    borderColor:"rgba(255, 255, 255, 0.19)"

    },
    ListTile:{
        flexDirection:"row",
        gap:moderateScale(22,0.2),
        alignItems:"center",


    },
    leading:{
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: (windowWidth * 0.12) * 2,
        overflow:"hidden",
        backgroundColor:"#FF3974",
        justifyContent:"center",
        alignItems:"center"
    }, 
    title:{
        fontSize:moderateScale(22,0.2),
        lineHeight:moderateScale(26,0.5)
    },
    profileImage:{
      width: windowWidth * 0.35,
      height: windowWidth * 0.35,
      alignSelf:"center",
      overflow: "hidden",
      borderRadius: (windowWidth * 0.35) / 2
    },
    image:{
      width:"100%",
      height:"100%"
    },
})