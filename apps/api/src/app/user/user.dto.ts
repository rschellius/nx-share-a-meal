import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string

  @IsNotEmpty()
  readonly lastName: string

  @IsNotEmpty()
  readonly password: string

  @IsNotEmpty()
  @IsEmail()
  readonly emailAdress: string

  @IsNotEmpty()
  readonly phoneNumber: string

  @IsNotEmpty()
  readonly isActive: boolean
}

// To create a type with the same fields, but with each one optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ListAllUsersDto {
  // query param search fields. Add more if you need.
  firstName?: string
  lastName?: string
}
