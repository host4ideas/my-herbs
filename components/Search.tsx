import {FontAwesome} from '@expo/vector-icons'
import {Icon, IconProps} from '@expo/vector-icons/build/createIconSet'
import React from 'react'
import {View, Text, Pressable, TextInput} from 'react-native'

interface CustomPressableComponentProps {
  text: string
  onPress?: () => void
  onIconPress?: () => void
}

export const Search = ({
  text,
  onPress,
  onIconPress
}: CustomPressableComponentProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.container, pressed && styles.pressedStyle]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <TextInput style={styles.text}>{text}</TextInput>
        <Pressable onPress={onIconPress}>
          <FontAwesome
            name={'search'}
            size={25}
            color="black"
            style={styles.icon}
          />
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = {
  container: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 5
  },
  pressedStyle: {
    opacity: 0.5
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  },
  icon: {
    marginLeft: 10
  }
}
