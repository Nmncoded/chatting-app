import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { Stack } from "expo-router";
import { WSProvider } from "@/service/sockets/WSProvider";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils/NotificationHandler";
import { registerDeviceToken } from "@/service/api/authService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
})

const HomeLayout = () => {

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  console.log("inside home layout");

  useEffect(() => {
    registerForPushNotificationsAsync()
    .then(async (token) => await registerDeviceToken(token ?? ''))
    .catch((error) => console.log("registerForPushNotificationsAsync ERROR",error));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification received: ", notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener((notification) => {
      console.log("Notification response received: ", notification);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    }
  },[])

  return (
    <WSProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="search" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="contacts" />
        <Stack.Screen name="notification" />
        <Stack.Screen name="profile" />
      </Stack>
    </WSProvider>
  );
};

export default HomeLayout;
