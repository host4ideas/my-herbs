import {getInfoAsync} from 'expo-file-system'
import {zip, unzip} from 'react-native-zip-archive'

export const zipFolderAsync = async (
  sourcePath: string,
  targetPath: string
): Promise<string | null> => {
  if (
    !sourcePath ||
    !targetPath ||
    !(await getInfoAsync(sourcePath)).isDirectory
  ) {
    throw new Error(
      'Both source and target paths are required and must be folders.'
    )
  }

  try {
    return await zip(sourcePath, targetPath)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const unzipFolderAsync = async (
  sourcePath: string,
  targetPath: string
): Promise<string | null> => {
  if (
    !sourcePath ||
    !targetPath ||
    !(await getInfoAsync(sourcePath)).isDirectory
  ) {
    throw new Error(
      'Both source and target paths are required and must be folders.'
    )
  }

  try {
    return await unzip(sourcePath, targetPath, 'UTF-8')
  } catch (error) {
    console.error(error)
    return null
  }
}
