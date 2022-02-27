import { IEntity } from '@cswp/entity'

export enum AgeCategory {
  all = 'all',
  children = 'children',
  adults = 'adults'
}

export class Actor implements IEntity {
  id!: number
  name = ''
  dob: Date = new Date()
}

export class Movie implements IEntity {
  id!: number
  name = ''
  releaseYear = 2000
  studio!: any //Studio | string;
  genre?: string[] = []
  ageCategory?: AgeCategory
  inTheatres: boolean | number = false
  actors?: Actor[] = []
  user!: any // User | string;
}
