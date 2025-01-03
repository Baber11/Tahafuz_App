import { FlatList, PermissionsAndroid, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import { requestContactsPermission, windowHeight, windowWidth } from '../Utillity/utils';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Icon } from 'native-base'
import CustomText from '../Components/CustomText'
import Color from '../Assets/Utilities/Color';
import Contacts from 'react-native-contacts';
import { useIsFocused } from '@react-navigation/native'
import ContactsModal from '../Components/ContactsModal'


const ContactsScreen = () => {
  const isFocused = useIsFocused();

  const [contacts, setContacts] = useState([
    {
      id:1,
      name:"Mir MUhammad",
      number:"0325-2968018",
    },
      {
      id:2,
      name:"Muhammad Umair",
      number:"0325-2968018",
    },
      {
      id:3,
      name:"Umees Ur Rehman",
      number:"0325-2968018",
  
    },
      {
      id:4,
      name:"Muhammad Huzaifa",
      number:"0325-2968018",
    },
      {
      id:5,
      name:"Muhammad Sumama",
      number:"0325-2968018",
    }
  ]);
  console.log("🚀 ~ ContactsScreen ~ contacts:", JSON.stringify(contacts,null,2))
  const [fetchedContacts , setFetchedContacts] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false)

  useEffect(()=>{
    const checkpermissions = async ()=>{
    const granted=  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
    if(granted == false){
      requestContactsPermission()
    }
      console.log("====> Permissions ==> ", granted)
    }
    checkpermissions()
  },[isFocused])
useEffect(()=>{
  const getContacts = async () =>{
    const contatcsData= await Contacts.getAll();
    setFetchedContacts(contatcsData?.map(item => ({
      id: item.recordID, 
      name: item.displayName,
      number: item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : '', 
      photo: item.thumbnailPath ? item.thumbnailPath : null,
    })))
    console.log(JSON.stringify(fetchedContacts,null,2));
  }
  getContacts()
},[isFocused])
  const settingsArray =[
      {
      id:1,
      name:"Mir MUhammad",
      phone:"0325-2968018",
    
      onPress: () =>{}
    },
      {
      id:2,
      name:"Muhammad Umair",
      phone:"0325-2968018",
      onPress: () =>{
      }
    },
      {
      id:3,
      name:"Umees Ur Rehman",
      phone:"0325-2968018",
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
        title={"Contacts"}
    titleImage={require("../Assets/Images/Personalcard.png")}
        textstyle={{fontWeight: "bold"}}
        showBack headerColor={"#FFECD0"}
        search
        headerRight={true}
        />
        <LinearGradient 
    colors={["#FFECD0","#FF3974CC"]}
    start={{x: 0.7, y:0.7 }}
    end={{x: 0.9, y:0.8 }}
    style={styles.main}
    >
        <View style={styles.mainSettings}>
          <FlatList 
           keyExtractor={item => item.id}
           data={contacts}
          //  style={{width: windowWidth * 0.85}}
          //  contentContainerStyle={{
          //   alignItems:"center",
          //   justifyContent:'center'
          //  }}
           renderItem={({item,index}) =>{
            return(
                <TouchableOpacity
                onPress={item?.onPress}
                style={styles.ListTile}>
               
                    <Avatar 

                    source={{uri: item?.photo }}
                    backgroundColor={"#8f97a6"}
                    >
                                          <Icon as={FontAwesome6} name={"user"} 
                     color={Color.white}
                     size={moderateScale(24,0.3)}/> 
                    </Avatar>
                    <View style={styles.infoText}>
                    <CustomText style={styles.title} isBold>{item.name}</CustomText>
                    <CustomText style={styles.phoneNum} isBold>{item.number}</CustomText>
                </View>
                {/* <View style={{width: windowWidth * 0.12}}> */}

            <Icon as={FontAwesome6} name={"phone"} 
                     color={Color.lightGreen}
                     size={moderateScale(24,0.3)}/> 
                   
                    
                </TouchableOpacity>       
            )
         }}

          />

         {/* {contacts.map()} */}

         <TouchableOpacity style={styles.FAB} onPress={()=>{
          setModalIsVisible(true);
         }}>
          <Icon 
          name={"plus"}
          as={AntDesign}
          size={moderateScale(21,0.2)}
          color={Color.white}
          />
         </TouchableOpacity>
        </View>
    </LinearGradient>
    <ContactsModal
    modalIsVisible={modalIsVisible}
    setModalIsVisible={setModalIsVisible}
    data={fetchedContacts?.filter(item => !contacts.some( c => c.id === item?.id))}
    // contacts={contacts}
    setContacts={setContacts}
    />
    </>
  )
}

export default ContactsScreen;

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
    paddingHorizontal:moderateScale(10,0.2),
borderRadius:moderateScale(10,0.2),
borderWidth:1,
borderColor:"rgba(255, 255, 255, 0.19)"

},
ListTile:{
    flexDirection:"row",
    paddingHorizontal:moderateScale(5,0.3),
    // width: windowWidth * 0.9,
    // backgroundColor:"red",
    gap:moderateScale(18,0.2),
    alignItems:"center",
    marginTop:moderateScale(10,0.2)


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
    lineHeight:moderateScale(26,0.5),
    
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