//@ts-nocheck
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as Notifications from "expo-notifications";
import { Stack } from 'expo-router';
import * as TaskManager from "expo-task-manager";
import 'react-native-reanimated';
import { NotificationProvider } from "./(context)/NotificationContext";
import NotificationNavigator from './(utils)/NotificationNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log("✅ Received a notification in the background!", {
      data,
      error,
      executionInfo,
    });
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export default function RootLayout() {
  return (
    <NotificationProvider>
      <ClerkProvider tokenCache={tokenCache}>
        <NotificationNavigator />
        <Stack screenOptions={{ headerShown: false }} />
      </ClerkProvider>
    </NotificationProvider>
  );
}
