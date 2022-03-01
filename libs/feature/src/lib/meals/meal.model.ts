/**
 *
 */

import { Allergenes, IMeal, IUser } from '@cswp/api-interfaces'
import { IEntity } from '@cswp/entity'

export class Meal implements IMeal, IEntity {
  readonly id = 0
  readonly name = ''
  readonly description = ''
  readonly isActive = false
  readonly isVega = false
  readonly isVegan = false
  readonly isToTakeHome = false
  readonly dateTime = new Date()
  readonly createDate = undefined
  readonly updateDate = undefined
  readonly imageUrl = ''
  readonly allergenes: Allergenes[] = []
  readonly maxAmountOfParticipants = 0
  readonly price = 0.0
  readonly cook!: IUser
  participants: IUser[] = []
}
