import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'


const RootLayout = () => {


  console.log('inside auth layout')
  return (
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name='signup'  />
        <Stack.Screen name='signin'  />
      </Stack>
  )
}

export default RootLayout