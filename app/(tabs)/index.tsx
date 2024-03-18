import React from 'react'
import {StyleSheet} from 'react-native'
import {View} from '@/components/Themed'
import {SafeAreaView} from 'react-native-safe-area-context'
import {PlantList} from '@/components/PlantList'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
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
    width: '90%'
  }
})
