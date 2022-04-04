import { PartialType } from '@nestjs/mapped-types'
import { IUser } from '@cswp/api-interfaces'
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto implements IUser {
  @ApiProperty({
    example: 'John',
    description: 'The firstname of the user'
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty({
    example: 'Doe',
    description: 'The lastname of the user'
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @ApiProperty({
    example: 'Lovensdijkstraat 61',
    description: 'The user`s adress'
  })
  @IsNotEmpty()
  readonly street: string

  @ApiProperty({
    example: 'Breda',
    description: 'The user`s city'
  })
  @IsNotEmpty()
  @IsString()
  readonly city: string

  @ApiProperty({
    example: 'secret',
    description: 'The user`s password'
  })
  @IsNotEmpty()
  readonly password: string

  @ApiProperty({
    example: 'j.doe@server.com',
    description: 'The emailadress of the user'
  })
  @IsNotEmpty()
  @IsEmail()
  readonly emailAdress: string

  token?: string
}

// To create a type with the same fields, but with each one optional
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  readonly id: number

  @IsBoolean()
  isActive: boolean

  @IsString()
  phoneNumber: string

  @IsArray()
  @IsNotEmpty()
  roles: any[]
}

export class ListAllUsersDto {
  // query param search fields. Add more if you need.
  firstName?: string
  lastName?: string
}
