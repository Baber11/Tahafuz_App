import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Color from '../Assets/Utilities/Color';
import TextInputWithTitle from './TextInputWithTitle';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomButton from './CustomButton';
import {position} from 'native-base/lib/typescript/theme/styled-system';

const ContactsModal = ({
  modalIsVisible,
  setModalIsVisible,
  data,
  contacts,
  setContacts,
}) => {
  const [name, setName] = useState('');
  const [contactsData, setContactsData] = useState(data);
  const [selectedContacts, setSelectedContacts] = useState([]);

  console.log(selectedContacts?.some(contact => contact?.id !== 1));
  return (
    <Modal
      isVisible={modalIsVisible}
      onBackdropPress={() => {
        setModalIsVisible(false);
        setSelectedContacts([]);
      }}>
      <LinearGradient
        colors={['#FFECD0', '#FF3974CC']}
        start={{x: 0.7, y: 0.7}}
        end={{x: 0.9, y: 0.8}}
        style={styles.maincontainer}>
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
          data={data?.filter(item => item.name.includes(name))}
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
                  if (
                    selectedContacts?.some(contact => contact?.id == item?.id)
                  ) {
                    setSelectedContacts(prev =>
                      prev.filter(item1 => item1?.id !== item?.id),
                    );
                  } else {
                    setSelectedContacts(prev => [...prev, item]);
                  }
                  console.log(item);
                  console.log(selectedContacts);
                }}>
                <Avatar
                  source={{uri: item?.photo}}
                  backgroundColor={Color.black}
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
            text={'Add'}
            bgColor={'#FFECD0'}
            borderColor={'white'}
            borderRadius={moderateScale(10, 0.4)}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {
              // navigation.navigate("Settings")
              setContacts(prevContacts => [
                ...prevContacts,
                ...selectedContacts,
              ]);
              setSelectedContacts([]);
              setModalIsVisible(false);
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
          />
        )}
      </LinearGradient>
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
    gap: moderateScale(11, 0.3),

    // margin
  },
  details: {
    // backgroundColor:"red",
    width: '70%',
  },
});
