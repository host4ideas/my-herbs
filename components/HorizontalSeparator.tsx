import React, {useCallback} from 'react'
import {View} from './Themed'
import {DimensionValue, StyleSheet} from 'react-native'

interface Props {
  widthValue?: DimensionValue
}

export const HorizontalSeparator = ({widthValue = '100%'}: Props) => {
  const styles = useCallback(() => {
    return StyleSheet.create({
      separator: {
        marginVertical: 10,
        height: 1,
        width: widthValue
      }
    })
  }, [widthValue])

  return (
    <View
      style={styles().separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  )
}
