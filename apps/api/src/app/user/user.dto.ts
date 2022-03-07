import { PartialType } from '@nestjs/mapped-types'
import { IUser } from '@cswp/api-interfaces'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto implements IUser {
  @ApiProperty({
    example: 'John',
    description: 'The firstname of the user'
  })
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty({
    example: 'Doe',
    description: 'The lastname of the user'
  })
  @IsNotEmpty()
  readonly lastName: string

  @ApiProperty({
    example: 'secret',
    description: 'The user`s password'
  })
  @IsNotEmpty()
  readonly password: string

  token?: string

  @ApiProperty({
    example: 'j.doe@server.com',
    description: 'The emailadress of the user'
  })
  @IsNotEmpty()
  @IsEmail()
  readonly emailAdress: string
}

// To create a type with the same fields, but with each one optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ListAllUsersDto {
  // query param search fields. Add more if you need.
  firstName?: string
  lastName?: string
}
