import { View, Text, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Colors } from '@/utils/Constants'
import {Stack} from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
    <>
      <StatusBar translucent backgroundColor={Colors.tertiary} style='light' />
      <RootNavigation />
    
    </>
  )
}

export default RootLayout

function RootNavigation() {
	return (
		<Stack screenOptions={{headerShown: false}} >
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(home)" options={{ headerShown: false }} />
		</Stack>
	)
}