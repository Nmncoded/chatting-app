import { View, Text, StyleSheet, ViewStyle, SafeAreaView } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@/utils/Constants'

interface CustomProps {
  style?: ViewStyle,
  children: React.ReactNode
}

const CustomSafeAreaView: FC<CustomProps> = ({style,children}) => {
  return (
    <View style={[styles.container, style]} >
      {/* <SafeAreaView>{children}</SafeAreaView> */}
      <SafeAreaView />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
})

export default CustomSafeAreaView