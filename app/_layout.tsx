import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Stack } from 'expo-router'
import { Colors } from '@/utils/Constants'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded] = useFonts({
    spaceMono : require("@/assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if(loaded){
      SplashScreen.hideAsync()
    }
  },[loaded])

  if(!loaded){
    return null
  }

  console.log('inside root layout')
  return (
    <View>
      <StatusBar translucent backgroundColor={Colors.tertiary} style='light' />
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name='index'  />
        <Stack.Screen name='(auth)'  />
      </Stack>
    </View>
  )
}

export default RootLayout