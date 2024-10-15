import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '@/components/ui/CustomSafeAreaView'
import { siginStyles } from '@/styles/signinStyles'
import LottieView from 'lottie-react-native'
import CustomText from '@/components/ui/CustomText'
import { signInWithGoogle } from '@/service/api/authService'
import { NativeModules } from 'react-native';

console.log(NativeModules);

const Page = () => {
  // console.log('inside signin')

  const handleLogin = async() => {
    console.log('handleLogin');
    await signInWithGoogle();
    return null;
  }

  return (
    <CustomSafeAreaView style={siginStyles.container} >
      <LottieView autoPlay loop source={require('@/assets/animations/telegram.json')} style={siginStyles.animation} />
      <CustomText variant='h3' style={siginStyles.title} >Welcome To Telegram</CustomText>
      <CustomText  style={siginStyles.message} >Messages are heavily encrypted and can safe destructly</CustomText>
      <TouchableOpacity style={siginStyles.loginBtn} onPress={handleLogin} >
        <Image source={require('@/assets/icons/google.png')} style={siginStyles.googleIcon} />
        <CustomText style={siginStyles.loginBtnText} >
          Sign in with Google
        </CustomText>
      </TouchableOpacity >
    </CustomSafeAreaView>
  )
}

export default Page