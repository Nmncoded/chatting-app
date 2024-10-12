import { View, Text } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '@/components/ui/CustomSafeAreaView'
import { siginStyles } from '@/styles/signinStyles'
import LottieView from 'lottie-react-native'
import CustomText from '@/components/ui/CustomText'

const Page = () => {
  return (
    <CustomSafeAreaView style={siginStyles.container} >
      <LottieView autoPlay loop source={require('@/assets/animations/telegram.json')} style={siginStyles.animation} />
      <CustomText variant='h3' style={siginStyles.title} >Welcome To Telegram</CustomText>
      <CustomText variant='h3' style={siginStyles.message} >Welcome To Telegram</CustomText>
    </CustomSafeAreaView>
  )
}

export default Page