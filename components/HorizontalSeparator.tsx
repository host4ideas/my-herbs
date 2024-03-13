import React from 'react'
import {View} from './Themed'
import {DimensionValue, StyleSheet} from 'react-native'

export const HorizontalSeparator = ({
  widthValue
}: {
  widthValue: DimensionValue
}) => {
  const styles = StyleSheet.create({
    separator: {
      marginVertical: 10,
      height: 1,
      width: widthValue
    }
  })
  return (
    <View
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  )
}
