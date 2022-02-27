import { Entity } from '@nx-share-a-meal/util'

export enum AgeCategory {
  all = 'all',
  children = 'children',
  adults = 'adults'
}

export class Actor extends Entity {
  name: string = ''
  dob: Date = new Date()
}

export class Movie extends Entity {
  name: string = ''
  releaseYear: number = 2000
  studio!: any //Studio | string;
  genre?: string[] = []
  ageCategory?: AgeCategory
  inTheatres: boolean | number = false
  actors?: Actor[] = []
  user!: any // User | string;
}
