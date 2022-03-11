import { ApiProperty } from '@nestjs/swagger'
import { Exclude, instanceToPlain } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Meal } from '../meal/meal.entity'
import { IUser, UserRole } from '@cswp/api-interfaces'

@Entity()
/**
 * https://stackoverflow.com/a/59140504
 * export class User extends BaseAbstractEntity implements IUser {
 */
export class User implements IUser {
  @ApiProperty({
    example: 0,
    description: 'The database ID of the user'
  })
  @PrimaryGeneratedColumn()
  id?: number

  @ApiProperty({
    example: 'John',
    description: 'The firstname of the user'
  })
  @Column()
  firstName: string

  @ApiProperty({
    example: 'Doe',
    description: 'The lastname of the user'
  })
  @Column()
  lastName: string

  @ApiProperty({
    example: 'Lovensdijkstraat 61',
    description: 'The street and housenumber of the users adress'
  })
  @Column()
  street: string

  @ApiProperty({
    example: 'Breda',
    description: 'The user`s city'
  })
  @Column()
  city: string

  @Column({
    type: 'set',
    enum: UserRole,
    default: [UserRole.GUEST, UserRole.EDITOR]
  })
  roles?: UserRole[] = []

  // @Exclude({ toPlainOnly: true })
  @Column({ default: true })
  @ApiProperty({
    example: true,
    description: 'Whether this is an active user',
    default: true
  })
  isActive?: boolean = true

  token?: string

  @ApiProperty({
    example: 'j.doe@server.com',
    description: 'The emailAdress of the user'
  })
  // https://stackoverflow.com/a/59140504
  // @ApiModelProperty({ example: faker.internet.email() })
  @IsEmail()
  @Column({ unique: true })
  emailAdress: string

  @Exclude({ toPlainOnly: true })
  @Column()
  @ApiProperty({
    example: 'secret',
    description: 'The password of the user'
  })
  password: string

  @ApiProperty({
    example: '06 12425475',
    description: 'The user`s phonenumber'
  })
  @Column({ nullable: true, default: '-' })
  phoneNumber?: string = ''

  @OneToMany(() => Meal, (meal) => meal.cook)
  meals?: Meal[]

  toJSON() {
    return instanceToPlain(this)
  }

  validatePassword? = function (password: string) {
    // if (!this.password || !this.passwordSalt) {
    //   return false
    // }
    // return comparedToHashed(password, this.password, this.passwordSalt)
  }
}
