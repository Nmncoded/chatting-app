import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/service/authStore'
import { registerForPushNotificationsAsync } from '@/utils/NotificationHandler';
import { logoutFromApp } from '@/service/api/authService';
import { searchStyles } from '@/styles/searchStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@/components/ui/CustomText';
import { profileStyles } from '@/styles/profileStyles';
import UserAvatar from '@/components/ui/UserAvatar';

const Profile = () => {
  const {user} = useAuthStore();
  const logoutHandler = async() => {
    registerForPushNotificationsAsync()
    .then(async (token) => await logoutFromApp(token ?? ''))
    .catch((error:any) => Alert.alert("registerForPushNotificationsAsync internet connection error",error));
  }
  return (
    <View style={searchStyles.container} >
        <View style={searchStyles.titleContainer} >
          <SafeAreaView />
          <View style={searchStyles.flexRowGap2} >
            <TouchableOpacity onPress={() => router.back()} >
              <Ionicons name='arrow-back-outline' style={searchStyles.icon} size={24} color='#fff' />
            </TouchableOpacity>
            <CustomText variant='h4' style={searchStyles.name} >Profile</CustomText>
          </View>
        </View>
        <View style={profileStyles.center} >
          <UserAvatar user={user} size='large' />
          <CustomText variant='h4' style={profileStyles.name} >{user?.full_name}</CustomText>
          <CustomText variant='h4' style={profileStyles.username} >@{user?.username}</CustomText>
        </View>
        <TouchableOpacity style={profileStyles.btn} onPress={logoutHandler} >
          <MaterialIcons name='logout' size={24} color={'#fff'} />
          <CustomText style={profileStyles.text} >Logout</CustomText>
        </TouchableOpacity>
    </View>
  )
}

export default Profile