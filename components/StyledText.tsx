import React from 'react'
import {Text, TextProps} from './Themed'
import {StyleSheet} from 'react-native'

export const MonoText = (props: TextProps) => {
  return <Text {...props} style={[props.style, styles.text]} />
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SpaceMono'
  }
})
