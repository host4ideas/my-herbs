import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {Link, Tabs} from 'expo-router'
import {Pressable, StyleSheet} from 'react-native'

import Colors from '@/constants/Colors'
import {useColorScheme} from '@/components/useColorScheme'
import {useClientOnlyValue} from '@/components/useClientOnlyValue'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) => <FontAwesome size={28} style={styles.tabBarIcon} {...props} />

const HeaderRightLink = () => {
  const colorScheme = useColorScheme()

  return (
    <Link href="/details" asChild>
      <Pressable>
        {({pressed}) => (
          <FontAwesome
            name="info-circle"
            size={25}
            color={Colors[colorScheme ?? 'light'].text}
            style={
              pressed ? styles.headerLinkRightPressed : styles.headerLinkRight
            }
          />
        )}
      </Pressable>
    </Link>
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true)
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({color}) => TabBarIcon({name: 'leanpub', color}),
          headerRight: HeaderRightLink
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({color}) => TabBarIcon({name: 'leaf', color})
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Tab Three',
          tabBarIcon: ({color}) => TabBarIcon({name: 'link', color})
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3
  },
  headerLinkRight: {marginRight: 15, opacity: 1},
  headerLinkRightPressed: {marginRight: 15, opacity: 0.5}
})
