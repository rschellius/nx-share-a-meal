import { IUser, UserRole } from '@cswp/api-interfaces'
import { IEntity } from '@cswp/entity'

export class User implements IUser, IEntity {
  emailAdress!: string
  token: string | undefined
  id?: number | undefined
  firstName!: string
  lastName!: string
  roles!: UserRole[]
  isActive!: boolean
  password!: string
  phoneNumber!: string

  constructor(values = {}) {
    // Assign all values to this objects properties
    Object.assign(this, values)
  }
}
