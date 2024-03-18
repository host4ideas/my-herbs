import {documentDirectory} from 'expo-file-system'

export const DATABASE_DIR = documentDirectory + 'myherbs/'

export const IMAGES_DIR = documentDirectory + DATABASE_DIR + 'images/'

export const DATA_DIR = documentDirectory + DATABASE_DIR + 'data/'

export const MIME_TYPES = {
  zip: ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip'],
  json: 'application/json',
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}
