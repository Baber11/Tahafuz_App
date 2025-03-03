import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Modal from 'react-native-modal';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import { moderateScale } from 'react-native-size-matters';

const ConfirmationModal = ({isVisible, setIsVisible, onDelete, isLoading}) => {
  return (
    <Modal 
    isVisible={isVisible}
    onBackdropPress={()=>{
        setIsVisible(false)
    }}
    style={styles.modal}
    >
        <View style={styles.modalCard}>
            <View style={styles.imageContainer}>
                <CustomImage
                source={require("../Assets/Images/bin.png")}
                style={styles.image}
                />
            </View>
            <CustomText style={styles.info}>{"You wanna delete this contacts?"}</CustomText>
            <View style={styles.modalActions}>
                <CustomButton
                activeOpacity={0.75}
                 text={"Cancel"}
                 bgColor={Color.secondaryColor}
                     borderColor={'white'}
                     borderRadius={moderateScale(10, 0.4)}
                     borderWidth={1}
                     textColor={Color.primaryColor}
                     onPress={() => {
                            setIsVisible(false)
                     }}
                     width={windowWidth * 0.25}
                     height={windowHeight * 0.05}
                     fontSize={moderateScale(24, 0.3)}
                     textTransform={'none'}
                     isGradient={false}
                     isBold
                     marginTop={moderateScale(30, 0.3)}
                     disabled={isLoading}
                />
                <CustomButton
                activeOpacity={0.75}
                 text={ isLoading ? <ActivityIndicator color={"white"} size={moderateScale(24,0.3)}/>  :"Delete"}
                 bgColor={Color.secondaryColor}
                     borderColor={'white'}
                     borderRadius={moderateScale(10, 0.4)}
                     borderWidth={1}
                     textColor={Color.primaryColor}
                     onPress={() => {
                            onDelete()
                     }}
                     width={windowWidth * 0.25}
                     height={windowHeight * 0.05}
                     fontSize={moderateScale(24, 0.3)}
                     textTransform={'none'}
                     isGradient={false}
                     isBold
                     marginTop={moderateScale(30, 0.3)}
                     disabled={isLoading}
                />

            </View>
        
        </View>
    </Modal>
  )
}

export default ConfirmationModal

const styles = StyleSheet.create({
    modal:{
        width: windowWidth,
        height: windowHeight,
        paddingLeft:moderateScale(10,0.2)
        // justifyContent:"center",
        // alignItems:"center"
    },
    modalCard:{
        justifyContent:"center",
        alignItems:"center",
        width: windowWidth * 0.85,
        backgroundColor:Color.primaryColor,
        paddingHorizontal:moderateScale(20,0.34),
        borderRadius:moderateScale(10,0.2),      
    }, 
    modalActions:{
        width: "100%",
        flexDirection:"row",
        justifyContent:"center",
        gap:moderateScale(20,0.3),
        paddingVertical:moderateScale(11,0.2)
    },
    info:{
        color: Color.secondaryColor
    },
    imageContainer:{
        width: windowWidth * 0.45,
        height: windowWidth * 0.45,
        overflow:"hidden"
    },
    image:{
        width:'100%',
        height:"100%"
    }
    // headerTitle
})