/**
 * Meal-related interfaces
 */

import { IUser } from '..'

export enum Allergenes {
  GLUTEN = 'gluten',
  LACTOSE = 'lactose',
  NUTS = 'noten'
}

export interface IMeal {
  name: string
  description: string
  isActive: boolean
  isVega: boolean
  isVegan: boolean
  isToTakeHome: boolean
  dateTime: Date
  imageUrl: string
  allergenes: Allergenes[]
  maxAmountOfParticipants: number
  price: number
  readonly participants: IUser[] | undefined
  readonly createDate: Date | undefined
  readonly updateDate: Date | undefined
}

export interface IParticipationInfo {
  currentlyParticipating: boolean
  currentAmountOfParticipants: number
}
