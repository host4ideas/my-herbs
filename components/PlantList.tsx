import React from 'react'
import {View, StyleSheet, FlatList, DimensionValue} from 'react-native'
import {MonoText} from './StyledText'
import {lists} from '@/mock/plantLists'
import {PlantCollection} from '@/interfaces/plant'
import {HorizontalSeparator} from './HorizontalSeparator'

const ITEM_HEIGHT = 100
const maxWidth: DimensionValue = '100%'

const PlantListItem = ({item}: {item: PlantCollection}) => (
  <View style={styles.rowItem} key={item.id}>
    <MonoText>{item.name}</MonoText>
  </View>
)

const PlantListItemDivider = () => <HorizontalSeparator widthValue={maxWidth} />

const keyExtractor = (item: PlantCollection, _index: number) =>
  item.id.toString()

const getItemLayout = (
  _: ArrayLike<PlantCollection> | null | undefined,
  index: number
) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  }
}

export const PlantList = () => (
  <FlatList
    style={styles.flatList}
    data={lists}
    ItemSeparatorComponent={PlantListItemDivider}
    keyExtractor={keyExtractor}
    renderItem={PlantListItem}
    getItemLayout={getItemLayout}
  />
)

const styles = StyleSheet.create({
  flatList: {
    flex: 1
  },
  rowItem: {
    // height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
