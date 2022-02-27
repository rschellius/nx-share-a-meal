/**
 *
 */

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GUEST = 'guest'
}

export interface IUser {
  id?: number
  firstName: string
  lastName: string
  roles: UserRole[]
  isActive: boolean
  emailAdress: string
  password: string
  phoneNumber?: string
  token: string | undefined
}
