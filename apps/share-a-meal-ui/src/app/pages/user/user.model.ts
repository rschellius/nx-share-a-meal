import { IUser, UserRole } from '@nx-share-a-meal/api-interfaces'
import { Entity } from '../../shared/common/entity.model'

export class User extends Entity implements IUser {
  emailAdress!: string
  token?: string
  override id?: number | undefined
  firstName!: string
  lastName!: string
  roles!: UserRole[]
  isActive!: boolean
  password!: string
  phoneNumber!: string

  constructor(values: any = {}) {
    super(values)
    // Assign all values to this objects properties
    Object.assign(this, values)
  }
}
