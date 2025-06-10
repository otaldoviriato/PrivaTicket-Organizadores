import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { View } from 'react-native'
import SignInScreen from '../(auth)/sign-in'
import { useNotification } from '../(context)/NotificationContext'
import EventList from './EventList'

export default function Page() {
  const { user } = useUser()
  const { expoPushToken } = useNotification()

  console.log("expoPushToken", expoPushToken)

  return (
    <View style={{ flex: 1 }}>
      <SignedIn>
        <EventList />
      </SignedIn>
      <SignedOut>
        <SignInScreen />
      </SignedOut>
    </View>
  )
}