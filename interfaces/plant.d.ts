export type Plant = {
  id: number
  name: string
  listIds: number[]
  details: PlantDetails
}

export type PlantDetails = {
  imageUrl: string
  scientificName?: string
  description?: string
  personalizedDetails: PersonalizedDetails[]
}

export interface PersonalizedDetails {
  [key: string]: string
}

export type PlantCollection = {
  id: number
  name: string
  length: number
}
