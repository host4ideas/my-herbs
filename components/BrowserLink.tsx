import React from 'react'
import {View, StyleSheet, Button, Linking} from 'react-native'

export const BrowserLink = ({url}: {url: string}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Click me"
        onPress={() => {
          Linking.openURL(url)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  }
})
