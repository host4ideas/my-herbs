import React from 'react'
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native'

interface CustomPressableProps {
  children: React.JSX.Element
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const CustomPressable = ({
  children,
  style,
  onPress
}: CustomPressableProps) => {
  return (
    <Pressable onPress={onPress} style={style}>
      {({pressed}) =>
        React.cloneElement(children as React.ReactElement<any>, {
          style: [children.props.style, pressed && styles.pressedStyle]
        })
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressedStyle: {
    opacity: 0.5
  }
})
