import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from 'native-base'
import CustomText from '../Components/CustomText'
import Color from '../Assets/Utilities/Color'

const Profile = () => {
  const settingsArray =[
      {
      id:1,
      name:"Mir MUhammad",
      phone:"0325-2968018",
      // iconName:"lock-outline",
      // iconType: MaterialIcons,

      onPress: () =>{}
    },
      {
      id:2,
      name:"Muhammad Umair",
      phone:"0325-2968018",
      // iconName:"shield-check",
      // iconType: Octicons,
      onPress: () =>{
        // navigation.navigate("SafetyAtWork")
      }
    },
      {
      id:3,
      name:"Umees Ur Rehman",
      // phone:"0325-2968018",
      // iconName:"account-box-outline",
      iconType: MaterialCommunityIcons,
      onPress: () =>{}
    },
      {
      id:4,
      name:"Muhammad Huzaifa",
      phone:"0325-2968018",
      // iconName:"exclamationcircleo",
      // iconType: AntDesign,
      onPress: () =>{}
    },
      {
      id:5,
      name:"Muhammad Sumama",
      phone:"0325-2968018",
      // iconName:"logout",
      // iconType: MaterialCommunityIcons,
      onPress: () =>{}
    }
  ]
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
        <LinearGradient 
    colors={["#FFECD0","#FF3974CC"]}
    start={{x: 0.7, y:0.7 }}
    end={{x: 0.9, y:0.8 }}
    style={styles.main}
    >
        <View style={styles.mainSettings}>

         {/* {settingsArray.map((item,index) =>{
            return(
                <TouchableOpacity
                onPress={item?.onPress}
                style={styles.ListTile}>
                    <View style={styles.leading}>
                     <Icon as={FontAwesome6} name={"user"} 
                     color={Color.white}
                     size={moderateScale(24,0.3)}/> 
                    </View>
                    <View style={styles.infoText}>
                    <CustomText style={styles.title} isBold>{item.name}</CustomText>
                    <CustomText style={styles.phoneNum} isBold>{item.phone}</CustomText>
                </View>
            <Icon as={FontAwesome6} name={"phone"} 
                     color={Color.lightGreen}
                     size={moderateScale(24,0.3)}/> 
                    
                </TouchableOpacity>       
            )
         })} */}

        </View>
    </LinearGradient>
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
    backgroundColor: "#8f97a6",
    justifyContent:"center",
    alignItems:"center"
}, 
title:{
    fontSize:moderateScale(21,0.2),
    lineHeight:moderateScale(26,0.5)
},
phoneNum:{
  color:"#8B8B8B",
  fontSize:moderateScale(18,0.2)
},
infoText:{
  width:"65%"
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


}
})