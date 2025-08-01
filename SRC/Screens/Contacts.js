import { useIsFocused } from '@react-navigation/native'
import { Avatar, Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, PermissionsAndroid, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Contacts from 'react-native-contacts'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import Color from '../Assets/Utilities/Color'
import ContactsModal from '../Components/ContactsModal'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import { apiHeader, requestContactsPermission, windowHeight, windowWidth } from '../Utillity/utils'
import CustomImage from '../Components/CustomImage'
import { Delete, Get } from '../Axios/AxiosInterceptorFunction'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContact, disabledBackgroundAction, setCOntacts } from '../Store/slices/common'
import ConfirmationModal from '../Components/ConfirmationModal'


const ContactsScreen = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [contactsData, setContactsData] = useState([]);
  // console.log("🚀 ~ ContactsScreen ~ contacts:", JSON.stringify(contacts,null,2))
  const [fetchedContacts , setFetchedContacts] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [confirmModalIsVisible, setConfirmModalIsVisible] = useState(false)
  const [isLoading, setIsLoading ] = useState(false);
  const [isDeleting, setIsDeleting ] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(0);
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
const getContacts = async () =>{
  const url= "auth/contact";
  setIsLoading(true);
  const response = await Get(url, token);
  setIsLoading(false);
  if(response != undefined){
    setContactsData(response?.data?.contacts_list);
    dispatch(setCOntacts(response?.data?.contacts_list));  
  }
    console.log("🚀 ~ getContacts ~ response?.data?.contacts_list:", response?.data?.contacts_list)
}

const deleteCOntact = async ()=>{
  const url =`auth/contact/${selectedContactId}`;
  setIsDeleting(true);
  const response = await Delete(url, apiHeader(token));
  setIsDeleting(false);
  if(response != undefined){
    setContactsData(prevData => prevData?.filter(item  => item?.id !== selectedContactId ) )
    dispatch(deleteContact({id: selectedContactId}));
    ToastAndroid.show("Contact has been deleted..", ToastAndroid.SHORT)
    setConfirmModalIsVisible(false)
  }
}

useEffect(()=>{
  getContacts();
},[isFocused,modalIsVisible])

useEffect(()=>{
  console.log("🚀 ~ ContactsScreen ~ contactsData:", JSON.stringify(contactsData,null, 2))
  if(contactsData?.length == 0){
    dispatch(disabledBackgroundAction());
  }
}, [contactsData])

const getContactsFromPhone = async () =>{
  const contatcsData= await Contacts.getAll();
  console.log("🚀 ~ getContactsFromPhone ~ contatcsData:", JSON.stringify(contatcsData,null, 2))
  

  // setFetchedContacts(finalContacts);
  setFetchedContacts(contatcsData?.map(item => ({
    id: item.recordID, 
    name: item.displayName,
    number: item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : '', 
    // photo: item.thumbnailPath ? item.thumbnailPath : null,
  })))
  // console.log("fetched contacts == > ",JSON.stringify(fetchedContacts,null,2));
}


 async function checkContactsPermssionsGranted(){
  if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)) {
   await getContactsFromPhone(); 
  }else{
   await requestContactsPermission();
  }
 }
useEffect(()=>{
  console.log("RUNNING CONTACTS EFFECT FUNC()")
  checkContactsPermssionsGranted();
  
  console.log("fetched Contacts ")
},[])


  return (
    <>
        <Header 
        title={"Contacts"}
    titleImage={require("../Assets/Images/Personalcard.png")}
        textstyle={{fontWeight: "bold"}}
        showBack={false} headerColor={"#FFECD0"}
        search
        headerRight={true}
        />
        <LinearGradient 
    colors={Color.themeBgColor}
    start={{x: 0.7, y:0.7 }}
    end={{x: 0.9, y:0.8 }}
    style={styles.main}
    >
        <View style={[styles.mainSettings, (contactsData?.length == 0 || isLoading)  && {
          justifyContent:"center",
          alignItems:"center"
        }]}>
         { isLoading ? 
          <ActivityIndicator color={Color.secondaryColor} size={"large"}/> 
          : <FlatList 
          keyExtractor={item => item.id}
          data={contactsData}
          ListEmptyComponent={()=>{
           return (
             <View style={{width: "100%", 
             paddingHorizontal:moderateScale(20,0.2),
             height: windowHeight * 0.67, 
             // backgroundColor:"red",
             alignItems:"center", justifyContent:"center"}}>
               <View style={{width: windowWidth * 0.25, height: windowWidth * 0.25, overflow:"hidden"}}>
               <CustomImage 
               style={{width:"100%", height:"100%"}}
               // resizeMode={"contain"}
               source={require("../Assets/Images/contacts.png")}/>
               </View>  
               <CustomText isBold>No Contacts Added yet.</CustomText>
             </View>
           )
          }}
          renderItem={({item,index}) =>{
           return(
               <TouchableOpacity
               onPress={()=>{
                setSelectedContactId(item?.id)
                 setConfirmModalIsVisible(true) 
               }}
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
                   <CustomText style={styles.title} isBold numberOfLines={1}>{item.name}</CustomText>
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
        }
       

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
    data={fetchedContacts?.filter(item => !contactsData.some( c => c.id === item?.id))}
    contacts={contactsData}
    setContacts={setContactsData}
    />
    <ConfirmationModal
    isVisible={confirmModalIsVisible}
    setIsVisible={setConfirmModalIsVisible}
    isLoading={isDeleting}
    onDelete={deleteCOntact}
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
    paddingHorizontal:moderateScale(8,0.3),
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