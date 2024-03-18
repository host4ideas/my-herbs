import {
  SQLiteDatabase,
  enablePromise,
  openDatabase
} from 'react-native-sqlite-storage'

// Enable promise for SQLite
enablePromise(true)

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'myherbs.db', location: 'Documents'},
    () => {},
    error => {
      console.error(error)
      throw Error('Could not connect to database')
    }
  )
}

export const createTables = async (db: SQLiteDatabase) => {
  const createTablesQuery = `
	CREATE TABLE IF NOT EXISTS Plant (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL
	);

	CREATE TABLE IF NOT EXISTS PlantDetails (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		plantId INTEGER NOT NULL,
		imageUrl TEXT NOT NULL,
		scientificName TEXT,
		description TEXT,
		FOREIGN KEY (plantId) REFERENCES Plant(id)
	);

	CREATE TABLE IF NOT EXISTS PersonalizedDetails (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		plantDetailsId INTEGER NOT NULL,
		key TEXT NOT NULL,
		value TEXT NOT NULL,
		FOREIGN KEY (plantDetailsId) REFERENCES PlantDetails(id)
	);

	CREATE TABLE IF NOT EXISTS PlantCollection (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL
	);

	CREATE TABLE IF NOT EXISTS PlantCollectionPlant (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		plantId INTEGER NOT NULL,
		collectionId INTEGER NOT NULL,
		FOREIGN KEY (plantId) REFERENCES Plant(id),
		FOREIGN KEY (collectionId) REFERENCES PlantCollection(id),
		PRIMARY KEY (plantId, collectionId)
	);

	CREATE TABLE IF NOT EXISTS PlantPersonalizedDetails (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		plantId INTEGER NOT NULL,
		personalizedDetailsId INTEGER NOT NULL,
		FOREIGN KEY (plantId) REFERENCES Plant(id),
		FOREIGN KEY (personalizedDetailsId) REFERENCES PersonalizedDetails(id),
		PRIMARY KEY (plantId, personalizedDetailsId)
	);
	`
  try {
    await db.executeSql(createTablesQuery)
  } catch (error) {
    console.error(error)
    throw Error('Failed to create tables')
  }
}

export const removeTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`
  try {
    await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to drop table ${tableName}`)
  }
}

// Create a new plant
export const createPlant = async (
  db: SQLiteDatabase,
  name: string
): Promise<number> => {
  const query = 'INSERT INTO Plant (name) VALUES (?)'
  try {
    const result = await db.executeSql(query, [name])
    return result[0].insertId
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Read a plant by ID
export const getPlantById = async (
  db: SQLiteDatabase,
  id: number
): Promise<any> => {
  const query = 'SELECT * FROM Plant WHERE id = ?'
  try {
    const result = await db.executeSql(query, [id])
    return result[0].rows.item(0)
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Update a plant by ID
export const updatePlant = async (
  db: SQLiteDatabase,
  id: number,
  name: string
): Promise<void> => {
  const query = 'UPDATE Plant SET name = ? WHERE id = ?'
  try {
    await db.executeSql(query, [name, id])
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Delete a plant by ID
export const deletePlant = async (
  db: SQLiteDatabase,
  id: number
): Promise<void> => {
  const query = 'DELETE FROM Plant WHERE id = ?'
  try {
    await db.executeSql(query, [id])
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Create a new plant details
export const createPlantDetails = async (
  db: SQLiteDatabase,
  plantId: number,
  imageUrl: string,
  scientificName?: string,
  description?: string
): Promise<number> => {
  const query =
    'INSERT INTO PlantDetails (plantId, imageUrl, scientificName, description) VALUES (?, ?, ?, ?)'
  try {
    const result = await db.executeSql(query, [
      plantId,
      imageUrl,
      scientificName,
      description
    ])
    return result[0].insertId
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Create a new plant collection
export const createPlantCollection = async (
  db: SQLiteDatabase,
  name: string
): Promise<number> => {
  const query = 'INSERT INTO PlantCollection (name) VALUES (?)'
  try {
    const result = await db.executeSql(query, [name])
    return result[0].insertId
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Add a plant to a collection
export const addPlantToCollection = async (
  db: SQLiteDatabase,
  plantId: number,
  collectionId: number
): Promise<void> => {
  const query =
    'INSERT INTO PlantCollectionPlant (plantId, collectionId) VALUES (?, ?)'
  try {
    await db.executeSql(query, [plantId, collectionId])
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Get all plants in a collection
export const getPlantsInCollection = async (
  db: SQLiteDatabase,
  collectionId: number
): Promise<number[]> => {
  const query =
    'SELECT plantId FROM PlantCollectionPlant WHERE collectionId = ?'
  try {
    const plantIds: number[] = []
    const results = await db.executeSql(query, [collectionId])

    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++)
        plantIds.push(result.rows.item(index))
    })
    return plantIds
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Delete a plant from a collection
export const deletePlantFromCollection = async (
  db: SQLiteDatabase,
  plantId: number,
  collectionId: number
): Promise<void> => {
  const query =
    'DELETE FROM PlantCollectionPlant WHERE plantId = ? AND collectionId = ?'
  try {
    await db.executeSql(query, [plantId, collectionId])
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Create a new personalized details
export const createPersonalizedDetails = async (
  db: SQLiteDatabase,
  plantDetailsId: number,
  key: string,
  value: string
): Promise<number> => {
  const query =
    'INSERT INTO PersonalizedDetails (plantDetailsId, key, value) VALUES (?, ?, ?)'
  try {
    const result = await db.executeSql(query, [plantDetailsId, key, value])
    return result[0].insertId
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

// Add a personalized detail to a plant
export const addPersonalizedDetailToPlant = async (
  db: SQLiteDatabase,
  plantId: number,
  key: string,
  value: string
): Promise<void> => {
  const query = `
		INSERT INTO PlantPersonalizedDetails (plantId, personalizedDetailsId)
	`
  try {
    await db.executeSql(query, [key, value, plantId])
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}

export const removePersonalizedDetailFromPlant = async (
  db: SQLiteDatabase,
  plantId: number,
  key: string
): Promise<void> => {
  const query = `
	DELETE FROM PersonalizedDetails
	WHERE plantDetailsId IN (
		SELECT pd.id
		FROM PlantDetails pd
		WHERE pd.plantId = ?
	) AND key = ?
`
  try {
    await db.executeSql(query, [plantId, key])
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    db.close()
  }
}
