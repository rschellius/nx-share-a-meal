import { IEntity } from '../../shared/common/entity.model'

export class User extends IEntity {
  name!: {
    firstName: string
    lastName: string
  }
  emailAdress!: string
  token?: string

  constructor(values: any = {}) {
    super(values)
    // Assign all values to this objects properties
    Object.assign(this, values)
  }
}
