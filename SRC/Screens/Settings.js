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
import { useDispatch } from 'react-redux'
import { setUserToken } from '../Store/slices/auth'

const Settings = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
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
    name:"Account",
    iconName:"account-box-outline",
    iconType: MaterialCommunityIcons,
    onPress: () =>{}
  },
    {
    id:4,
    name:"About",
    iconName:"exclamationcircleo",
    iconType: AntDesign,
    onPress: () =>{}
  },
    {
    id:5,
    name:"Logout",
    iconName:"logout",
    iconType: MaterialCommunityIcons,
    onPress: () =>{
      dispatch(setUserToken({}))
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
        showBack headerColor={"#FFECD0"}
        headerRight
        />
    <LinearGradient 
    colors={["#FFECD0","#FF3974CC"]}
    start={{x: 0.7, y:0.7 }}
    end={{x: 0.9, y:0.8 }}
    style={styles.main}
    >
        <View style={styles.mainSettings}>
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
    }
})