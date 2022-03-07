/**
 *
 */

import { Allergenes, IMeal, IUser } from '@cswp/api-interfaces'
import { IEntity } from '@cswp/entity'

export class Meal implements IMeal, IEntity {
  readonly id = 0
  name = ''
  description = ''
  isActive = false
  isVega = false
  isVegan = false
  isToTakeHome = false
  dateTime = new Date()
  readonly createDate = undefined
  readonly updateDate = undefined
  imageUrl = ''
  allergenes: Allergenes[] = []
  maxAmountOfParticipants = 0
  price = 0.0
  readonly cook?: IUser
  readonly participants: IUser[] = []
}
