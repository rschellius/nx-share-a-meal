import { IEntity } from '../../shared/common/entity.model'
import { Studio } from '../studio/studio.model'
import { User } from '../user/user.model'

export enum AgeCategory {
  all = 'all',
  children = 'children',
  adults = 'adults'
}

export class Actor extends IEntity {
  name: string = ''
  dob: Date = new Date()
}

export class Movie extends IEntity {
  name: string = ''
  releaseYear: number = 2000
  studio!: any //Studio | string;
  genre?: string[] = []
  ageCategory?: AgeCategory
  inTheatres: boolean | number = false
  actors?: Actor[] = []
  user!: any // User | string;
}
