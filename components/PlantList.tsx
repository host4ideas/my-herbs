import React from 'react'
import {View, StyleSheet, FlatList, Appearance} from 'react-native'
import {MonoText, MonoTextInput} from './StyledText'
import {lists} from '@/mock/plantLists'
import {PlantCollection} from '@/interfaces/plant'
import {HorizontalSeparator} from './HorizontalSeparator'
import {FontAwesome} from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import {CustomPressable} from './StyledPressable'
import {useNavigation} from 'expo-router'
import {forwardRef} from 'react'
import {StackNavigationProp} from '@react-navigation/stack'

const PlantListItem = ({item}: {item: PlantCollection}) => {
  return <PlantListLink item={item} />
}

interface Props {
  children?: React.JSX.Element
  item: PlantCollection
}

type RootStackParamList = {
  details: {id: number} | undefined
}

export const PlantListLink = forwardRef<typeof CustomPressable, Props>(
  (props, _ref) => {
    const colorScheme = Appearance.getColorScheme()
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
    const [isEditing, setIsEditing] = React.useState(false)

    const handleLinkPress = () =>
      navigation.navigate('details', {id: props.item.id})

    const handleEditPress = () => setIsEditing(!isEditing)

    return (
      <CustomPressable onPress={handleLinkPress}>
        <View style={styles.rowItem} key={props.item.id}>
          {isEditing ? (
            <MonoTextInput
              style={styles.rowItemText}
              placeholder="Nuevo nombre..."
            />
          ) : (
            <MonoText style={styles.rowItemText}>{props.item.name}</MonoText>
          )}
          <CustomPressable onPress={handleEditPress}>
            <FontAwesome
              name="edit"
              size={25}
              color={Colors[colorScheme ?? 'light'].text}
            />
          </CustomPressable>
        </View>
      </CustomPressable>
    )
  }
)

const PlantListItemDivider = () => <HorizontalSeparator />

const keyExtractor = (item: PlantCollection, _index: number) =>
  item.id.toString()

export const PlantList = () => (
  <FlatList
    style={styles.flatList}
    data={lists}
    ItemSeparatorComponent={PlantListItemDivider}
    keyExtractor={keyExtractor}
    renderItem={PlantListItem}
  />
)

const styles = StyleSheet.create({
  flatList: {
    flex: 1
  },
  rowItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rowItemLink: {
    display: 'flex'
  },
  rowItemText: {
    fontSize: 18,
    width: '90%'
  }
})
