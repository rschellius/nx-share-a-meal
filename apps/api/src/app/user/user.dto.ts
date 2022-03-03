import { PartialType } from '@nestjs/mapped-types'
import { IUser } from '@cswp/api-interfaces'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  readonly firstName: string

  @IsNotEmpty()
  readonly lastName: string

  @IsNotEmpty()
  readonly password: string

  token?: string

  @IsNotEmpty()
  @IsEmail()
  readonly emailAdress: string

  // @IsNotEmpty()
  // readonly phoneNumber: string

  // @IsNotEmpty()
  // readonly isActive: boolean

  // @IsNotEmpty()
  // readonly roles: UserRole[]
}

// To create a type with the same fields, but with each one optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ListAllUsersDto {
  // query param search fields. Add more if you need.
  firstName?: string
  lastName?: string
}
