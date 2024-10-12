import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'


const RootLayout = () => {


  // console.log('inside root layout')
  return (
    // <View>
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name='signup'  />
        <Stack.Screen name='signin'  />
      </Stack>
    // </View>
  )
}

export default RootLayout