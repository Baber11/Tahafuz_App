import { Avatar, Icon } from 'native-base';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useDispatch, useSelector } from 'react-redux';
import { setCOntacts } from '../Store/slices/common';

const ContactsModal = ({
  modalIsVisible,
  setModalIsVisible,
  data,
  contacts,
  setContacts,
}) => {
  console.log("🚀 ~ data:", data)
  console.log("🚀 ~ contacts:", contacts)
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [name, setName] = useState('');
  const [contactsData, setContactsData] = useState(data);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  contacts.map((item,index) =>{
    console.log("first  === > ", item)          
    return (
      selectedContacts.some(item1 => item1.number == item.number)
    )
   } )
  const addContact = async () =>{
    const url = "auth/contact";

    const formData = new FormData();
    if(selectedContacts.length > 0) {
      selectedContacts?.map((item, index) =>{
        formData.append(`contacts[${index}][name]`, item.name);
        formData.append(`contacts[${index}][number]`, item.number);
      })
    }
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    if(response != undefined){
      setContacts(prevContacts => [
        ...prevContacts,
        ...response?.data?.data,
      ]);
      setSelectedContacts([]);
      setModalIsVisible(false);
    console.log("response ==> ", JSON.stringify(response?.data,null,2));
    }

  }
  console.log(selectedContacts?.some(contact => contact?.id !== 1));
  return (
    <Modal
      isVisible={modalIsVisible}
      onBackdropPress={() => {
        setModalIsVisible(false);
        setSelectedContacts([]);
      }}>
      <ScrollView>
      <LinearGradient
        colors={['#FFECD0', '#FF3974CC']}
        start={{x: 0.7, y: 0.7}}
        end={{x: 0.9, y: 0.8}}
        style={styles.maincontainer}>
          <Icon
          as={Entypo}
          name='cross'
          onPress={()=>{
            setModalIsVisible(false)
          }}
          size={moderateScale(22,0.3)}
          color={"#FF3974CC"}
          style={{
            position:"absolute",
            top:moderateScale(7,0.2),
            right: moderateScale(12,0.3)}}
          />
        <TextInputWithTitle
          title={''}
          titleStlye={{fontSize: moderateScale(12, 0.2), paddingHorizontal: 0}}
          secureText={false}
          placeholder={'Search Contacts...'}
          setText={setName}
          value={name}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.68}
          border={1}
          backgroundColor={'rgba(255,255,255,0.35)'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.pink}
          borderColor={Color.grey}
          placeholderColor={Color.black}
          borderRadius={moderateScale(10, 0.4)}
          // disable
        />
        <FlatList
          data={data?.filter(item => item.name.toLowerCase().includes(name?.toLowerCase()))}
          keyExtractor={item => item?.id}
          contentContainerStyle={[
            {
              width: windowWidth * 0.75,
              paddingVertical: moderateScale(20, 0.2),
              // paddingHorizontal:moderateScale(20,0.2),
              // backgroundColor:"black",
              gap: moderateScale(10, 0.3),
            },
            data?.length == 0 && {
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => {
                 if(selectedContacts?.length > 5 && !selectedContacts?.some(contact => contact?.id == item?.id)){
                    return Platform.OS == "android" ? 
                    ToastAndroid.show("You can only Select Five contacts.", ToastAndroid.SHORT) :
                    Alert.alert("You can only Select Five contacts.")
                 }
                  else if (
                    selectedContacts?.some(contact => contact?.id == item?.id)
                  ) {
                    setSelectedContacts(prev =>
                      prev.filter(item1 => item1?.id !== item?.id),
                    );
                  }  else {
                    setSelectedContacts(prev => [...prev, item]);
                  }
                  console.log(item);
                  console.log(selectedContacts);
                }}>
                <Avatar
                  source={{uri: item?.photo}}
                 
                  backgroundColor={"#80453DFF"}
                children={
                  !item?.photo && item?.name ? (
                    <CustomText 
                    // isBold
                    style={{ color: 'white', fontSize: moderateScale(18,0.2) }}>
                      {item.name.charAt(0).toUpperCase()}
                    </CustomText>
                  ) : null
                }
                />
                <View style={styles.details}>
                  <CustomText isBold>{item?.name}</CustomText>
                  <CustomText>{item?.number}</CustomText>
                </View>
                {selectedContacts?.some(contact => contact?.id == item?.id) && (
                  <Icon name="checkcircle" as={AntDesign} color={'#FF3974CC'} />
                )}
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{alignItems: 'center', gap: moderateScale(20, 0.3)}}>
                <Icon
                  as={FontAwesome6}
                  name={'phone'}
                  color={Color.lightGreen}
                  size={moderateScale(54, 0.3)}
                />
                <CustomText isBold style={{textAlign: 'center'}}>
                  No contacts available!
                </CustomText>
              </View>
            );
          }}
        />
        {selectedContacts?.length > 0 && (
          <CustomButton
            text={isLoading ? <ActivityIndicator color={"white"} size={moderateScale(24,0.3)}/>  : 'Add'}
            bgColor={'#FFECD0'}
            borderColor={'white'}
            borderRadius={moderateScale(10, 0.4)}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {
             if(contacts?.length >=5){
                return ToastAndroid.show("You have already five contacts in your list.", ToastAndroid.SHORT);
             }
             else if(contacts.some(item => selectedContacts.some(item1 => item1.number == item.number))){
              return Alert.alert(`Contacts duplicated`)
             }
             else{
    // dispatch(setCOntacts(selectedContacts));  

              addContact()
             }
              // navigation.navigate("Settings")
              // setContacts(prevContacts => [
              //   ...prevContacts,
              //   ...selectedContacts,
              // ]);

              //   dispatch(setUserToken({token:"abcedfe"}))
            }}
            width={windowWidth * 0.35}
            height={windowHeight * 0.06}
            fontSize={moderateScale(24, 0.3)}
            textTransform={'Add'}
            isGradient={false}
            style={{position: 'absolute', bottom: moderateScale(20, 0.3)}}
            isBold
            marginTop={moderateScale(30, 0.3)}
            disabled={isLoading}
          />
        )}
      </LinearGradient>
      </ScrollView>  

    </Modal>
  );
};

export default ContactsModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.themeColor,
  },
  contactItem: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: moderateScale(5, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:moderateScale(10,0.2),
    gap: moderateScale(11, 0.3),
    // margin
  },
  details: {
    // backgroundColor:"red",
    width: '70%',
  },
});
