import {
  Allow,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsUrl
} from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { Allergenes, UserEntity } from '@cswp/api-interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class CreateMealDto {
  @ApiProperty({
    example: 'Spaghetti Bolognese',
    description: 'The name of the meal'
  })
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({
    example: 'Dé pastaklassieker bij uitstek.',
    description: 'The longer description of the meal'
  })
  @IsNotEmpty()
  readonly description: string

  @ApiProperty({
    example: true,
    description: 'Whether this is an active meal'
  })
  @IsBoolean()
  readonly isActive: boolean

  @ApiProperty({
    example: true,
    description: 'Whether this is a vegetarian meal'
  })
  @IsBoolean()
  readonly isVega: boolean

  @ApiProperty({
    example: true,
    description: 'Whether this is a vegan meal'
  })
  @IsBoolean()
  readonly isVegan: boolean

  @ApiProperty({
    example: true,
    description: 'Whether this is a meal to take home'
  })
  @IsBoolean()
  readonly isToTakeHome: boolean

  @ApiProperty({
    example: new Date(),
    description: 'The date this meal is served.'
  })
  @IsNotEmpty()
  @IsDate()
  readonly dateTime: Date

  @ApiProperty({
    example:
      'https://miljuschka.nl/wp-content/uploads/2021/02/Pasta-bolognese-3-2.jpg',
    description: 'The url to an image of the meal'
  })
  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string

  @ApiProperty({
    description:
      'Enumeration of allergene information. Only a combination of zero or more of the given values is allowed.',
    example: '["gluten", "noten", "lactose"]'
  })
  @IsNotEmpty()
  readonly allergenes: Allergenes[]

  @ApiProperty({
    example: '6',
    description: 'The maximum amount of participants of the meal'
  })
  @IsNotEmpty()
  @IsNumber()
  readonly maxAmountOfParticipants: number

  @ApiProperty({
    example: '6.75',
    description: 'The price of the meal. Number with 2 digits.'
  })
  @IsNotEmpty()
  readonly price: number

  @Allow()
  id: number

  @Allow()
  cook: UserEntity

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
