import { View, Text, Image, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { splashStyles } from '@/styles/splashStyles'
import { resetAndNavigate } from '@/utils/LibraryHelpers'

const Main = () => {

  console.log('inside root Main')

  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate('/(auth)/signin')
    },300)
  },[])

  return (
    <View style={splashStyles.container} >
      <Image style={splashStyles.logo} source={require('@/assets/images/adaptive-icon.png')}  />
    </View>
  )
}

export default Main