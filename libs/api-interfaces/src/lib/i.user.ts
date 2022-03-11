/**
 * User interfaces
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
  street: string
  city: string
  emailAdress: string
  password: string
  phoneNumber?: string
  token?: string | undefined
  isActive?: boolean
  roles?: UserRole[]
}

export interface ILoginFormData {
  emailAdress: string
  password: string
}
