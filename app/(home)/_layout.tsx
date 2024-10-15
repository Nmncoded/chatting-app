import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'


const HomeLayout = () => {


  console.log('inside home layout')
  return (
    // <View>
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name='home'  />
      </Stack>
    // </View>
  )
}

export default HomeLayout