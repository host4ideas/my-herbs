import React from 'react'
import {DimensionValue, StyleSheet} from 'react-native'
import {Text, View} from '@/components/Themed'
import {SafeAreaView} from 'react-native-safe-area-context'
import {HorizontalSeparator} from '@/components/HorizontalSeparator'
import {PlantList} from '@/components/PlantList'

const maxWidth: DimensionValue = '80%'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <HorizontalSeparator widthValue={maxWidth} />
      <SafeAreaView style={styles.list}>
        <PlantList />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  list: {
    flex: 1,
    width: '80%'
  }
})
