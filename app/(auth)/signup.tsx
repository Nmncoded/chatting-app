import { View, Text, Touchable, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@/components/ui/CustomSafeAreaView'
import { siginStyles } from '@/styles/signinStyles'
import LottieView from 'lottie-react-native'
import CustomText from '@/components/ui/CustomText'
import { signupStyles } from '@/styles/signupStyles'
import { router } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { launchCamera, launchGallery } from '@/utils/LibraryHelpers'
import { uploadFile } from '@/service/api/fileService'
import { checkUsername, signUpWithGoogle } from '@/service/api/authService'
import CustomInput from '@/components/ui/CustomInput'

const Page = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [loading , setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<any>('');


  const validateUsername = async(name:string) => {
    if(name?.length>3){
      // console.log('validating username');
      const isValid =  await checkUsername(name)
      return isValid;
    }
    return false;
  }


  const createAccount = async() => {
    if(!firstName || !lastName || !username || !profilePic){
      Alert.alert('Error','Please fill all details')
      return;
    }
    setLoading(true);
    try {
      const mediaUrl = await uploadFile(profilePic);
        console.log(firstName, lastName, username, profilePic,mediaUrl);
      await signUpWithGoogle({
        username,
        first_name: firstName,
        last_name: lastName,
        profile_picture: mediaUrl,
      })
      
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  const handleImagePick = async() => {
    const res  = await launchGallery();
    if(res){
      console.log(res);
      setProfilePic(res)
    }

  }

  return (
    <CustomSafeAreaView style={signupStyles.container} >
      <TouchableOpacity onPress={() => router.back()} >
        <Ionicons name='arrow-back-outline' size={RFValue(20)} color={'#fff'} />
      </TouchableOpacity>
      <TouchableOpacity style={signupStyles.cameraIcon} onPress={handleImagePick} >
        {
          profilePic.uri ? 
          <Image source={{ uri: profilePic.uri }} style={signupStyles.image} /> 
          : 
          <MaterialCommunityIcons name='camera-plus' size={RFValue(18)} color={'#fff'} />
        }
      </TouchableOpacity>
      <CustomText variant='h4' style={signupStyles.profileText} >Profile info</CustomText>
      <CustomText  style={signupStyles.instructions} >Enter your unique username, name and add profile photo</CustomText>
      <CustomInput label='username' value={username} onChangeText={setUsername} showValidationIcon validationFunction={validateUsername} />
      <CustomInput label='First Name' value={firstName} onChangeText={setFirstName} />
      <CustomInput label='Last Name' value={lastName} onChangeText={setLastName} />
      <View style={signupStyles.footer} >
        <CustomText style={signupStyles.termsText} >
          By signing up, you agree to the Terms & Services
        </CustomText>
        <TouchableOpacity style={signupStyles.submitButton} onPress={createAccount} >
          {
            !loading ?
            <MaterialCommunityIcons name='arrow-right' size={RFValue(24)} color={'#fff'} /> : <ActivityIndicator size={'small'} color={'#fff'} />
          }
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  )
}

export default Page