import {
  Allow,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsUrl
} from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { Allergenes } from '@cswp/api-interfaces'
import { User } from '../user/user.entity'

export class CreateMealDto {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly description: string

  @IsBoolean()
  readonly isActive: boolean

  @IsBoolean()
  readonly isVega: boolean

  @IsBoolean()
  readonly isVegan: boolean

  @IsBoolean()
  readonly isToTakeHome: boolean

  @IsNotEmpty()
  @IsDate()
  readonly dateTime: Date

  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string

  @IsNotEmpty()
  readonly allergenes: Allergenes[]

  @IsNotEmpty()
  @IsNumber()
  readonly maxAmountOfParticipants: number

  @IsNotEmpty()
  readonly price: number

  @Allow()
  id: number

  @Allow()
  cook: User

  participants: any[]
  readonly createDate: Date
  readonly updateDate: Date
}

// To create a type with the same fields, but with each one optional
export class UpdateMealDto extends PartialType(CreateMealDto) {}

export class QueryMealsDto {
  @IsBoolean()
  readonly isActive: boolean

  @IsBoolean()
  readonly isVega: boolean

  @IsBoolean()
  readonly isVegan: boolean

  @IsBoolean()
  readonly isToTakeHome: boolean
}
