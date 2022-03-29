import { ApiProperty } from '@nestjs/swagger'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserEntity } from './user.entity'
import { IMeal, Allergenes, IParticipationInfo } from './i.meal'

@Entity()
export class Meal implements IMeal {
  @ApiProperty({
    example: 0,
    description: 'The database ID of the meal'
  })
  @PrimaryGeneratedColumn()
  id?: number

  @ApiProperty({
    example: 'Spaghetti Bolognese',
    description: 'The name of the meal'
  })
  @Column('varchar', { length: 200 })
  name: string

  @ApiProperty({
    example: 'Dé pastaklassieker bij uitstek.',
    description: 'The longer description of the meal'
  })
  @Column('varchar', { length: 400 })
  description: string

  @ApiProperty({
    example: true,
    description: 'Whether this is an active meal'
  })
  @Column('boolean', { default: false })
  isActive: boolean

  @ApiProperty({
    example: true,
    description: 'Whether this is a vegetarian meal'
  })
  @Column('boolean', { default: false })
  isVega: boolean

  @ApiProperty({
    example: true,
    description: 'Whether this is a vegan meal'
  })
  @Column('boolean', { default: false })
  isVegan: boolean

  @ApiProperty({
    example: true,
    description: 'Whether this is a meal to take home'
  })
  @Column('boolean', { default: true })
  isToTakeHome: boolean

  @ApiProperty({
    example: new Date(),
    description: 'The date this meal is served.'
  })
  @Column('datetime', {})
  dateTime: Date

  @CreateDateColumn()
  createDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @ApiProperty({
    example: '6',
    description: 'The maximum amount of participants of the meal'
  })
  @Column({ default: 6 })
  maxAmountOfParticipants: number

  @ApiProperty({
    example: '6.75',
    description: 'The price of the meal'
  })
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number

  @ApiProperty({
    example:
      'https://miljuschka.nl/wp-content/uploads/2021/02/Pasta-bolognese-3-2.jpg',
    description: 'The url to an image of the meal'
  })
  @Column()
  imageUrl: string

  @ApiProperty({
    description: 'Enumeration of allergene information',
    example: '["gluten", "noten", "lactose"]'
  })
  @Column({
    type: 'set',
    enum: Allergenes,
    default: []
  })
  allergenes: Allergenes[]

  @ApiProperty({
    type: () => UserEntity,
    description: 'The person who created and cooks this meal.'
  })
  @ManyToOne(() => UserEntity, (cook) => cook.meals, { eager: true })
  cook: UserEntity

  @ApiProperty({
    description: 'An array of the people participating in this meal.',
    type: () => [UserEntity]
  })
  @ManyToMany(() => UserEntity, { eager: true })
  @JoinTable()
  participants: UserEntity[]
}

export class ParticipationInfo implements IParticipationInfo {
  @ApiProperty({
    description:
      'Property indicating whether the authenticated user is currently paticipating in the meal.'
  })
  currentlyParticipating: boolean

  @ApiProperty({
    description:
      'Property indicating the number of users currently paticipating in the meal.'
  })
  currentAmountOfParticipants: number

  constructor(participation: boolean, currentAmount: number) {
    this.currentlyParticipating = participation
    this.currentAmountOfParticipants = currentAmount
  }
}
