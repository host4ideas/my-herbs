import React from 'react'
import {Text, TextProps} from './Themed'
import {
  Appearance,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData
} from 'react-native'
import Colors from '@/constants/Colors'

export const MonoText = (props: TextProps) => {
  return <Text {...props} style={[props.style, styles.text]} />
}

interface MonoTextInputProps extends TextProps {
  placeholder: string
}

export const MonoTextInput = (props: MonoTextInputProps) => {
  const colorScheme = Appearance.getColorScheme()
  const [inputText, setText] = React.useState('')
  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setText(e.nativeEvent.text)

  return (
    <TextInput
      placeholderTextColor={Colors[colorScheme ?? 'light'].text}
      cursorColor={Colors[colorScheme ?? 'light'].text}
      {...props}
      onChange={handleChange}
      style={[props.style, styles.text]}
      children={<MonoText>{inputText}</MonoText>}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SpaceMono'
  }
})
