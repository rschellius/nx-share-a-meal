/**
 * Meal-related interfaces
 */

import { IUser } from "..";

export enum Allergenes {
  GLUTEN = 'gluten',
  LACTOSE = 'lactose',
  NUTS = 'noten'
}

export interface IMeal {
  readonly name: string
  readonly description: string
  readonly isActive: boolean
  readonly isVega: boolean
  readonly isVegan: boolean
  readonly isToTakeHome: boolean
  readonly dateTime: Date
  readonly createDate: Date | undefined
  readonly updateDate: Date | undefined
  readonly imageUrl: string
  readonly allergenes: Allergenes[]
  readonly maxAmountOfParticipants: number
  readonly price: number
  participants: IUser[]
}
