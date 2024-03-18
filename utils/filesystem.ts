import {
  deleteAsync,
  getInfoAsync,
  makeDirectoryAsync,
  readAsStringAsync,
  copyAsync
} from 'expo-file-system'
import {getDocumentAsync} from 'expo-document-picker'

export const strToU8 = (str: string) => new TextEncoder().encode(str)

/**
 * Checks if a directory exists. If not, creates it
 * @param dir Path to the directory to ensure exists
 */
export const ensureDirExistsAsync = async (dir: string) => {
  const dirInfo = await getInfoAsync(dir)
  if (!dirInfo.exists) await makeDirectoryAsync(dir, {intermediates: true})
}

/**
 * Deletes a file or directory
 * @param path Path to the file or directory to delete
 */
export const deleteFileOrDirectory = async (path: string) =>
  await deleteAsync(path)

export const fileToU8 = async (path: string): Promise<Uint8Array | null> => {
  const fileInfo = await getInfoAsync(path)
  if (!fileInfo.exists || fileInfo.isDirectory) return null
  const content = await readAsStringAsync(fileInfo.uri)
  return strToU8(content)
}

export const pickFileAsync = async (type: string | string[]) => {
  const result = await getDocumentAsync({
    type,
    multiple: false,
    copyToCacheDirectory: true
  })
  if (!result.canceled && result.assets.length === 1) {
    const pickedFile = result.assets[0]
    return {
      uri: pickedFile.uri,
      name: pickedFile.name
    }
  }
  return null
}

export const copyFileAsync = async (from: string, to: string) => {
  const fileInfo = await getInfoAsync(from)
  if (!fileInfo.exists || fileInfo.isDirectory) return false
  return await copyAsync({from, to})
}
