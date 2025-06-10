//@ts-nocheck
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'

export default function NotificationNavigator() {
  const router = useRouter()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        const data = response.notification.request.content.data
        const { screen, ...params } = data || {}

        if (screen) {
          const query = new URLSearchParams(params).toString()
          router.push(`/${screen}${query ? `?${query}` : ''}`)
        }
      })

    return () => {
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  return null
}
