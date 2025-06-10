import { Stack } from 'expo-router/stack'
import { EventProvider } from '../(context)/EventContext'

export default function Layout() {
  return (
    <EventProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </EventProvider>
  )
}