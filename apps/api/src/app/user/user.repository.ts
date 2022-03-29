import { Repository, EntityRepository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { HttpException, HttpStatus, Logger } from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Logging
  private readonly logger = new Logger(UserRepository.name)

  public async findAll(): Promise<User[]> {
    this.logger.log('findAll')
    return await this.find({ relations: ['user'] })
  }

  public createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.findOne({ emailAdress: createUserDto.emailAdress }).then(
      (user) => {
        if (user) {
          this.logger.log(
            'createUser - ' + user.emailAdress + ' already taken.'
          )
          throw new HttpException(
            'Emailadress already taken',
            HttpStatus.CONFLICT
          )
        }
        if (!user) {
          this.logger.log('createUser - creating ' + createUserDto.emailAdress)
          const newUser = new User()
          const toInsert = { ...newUser, ...createUserDto }
          this.logger.log(toInsert)
          return this.save(toInsert)
        }
      }
    )
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    this.logger.log('updateUser id=' + id)
    console.log(updateUserDto)
    const user = await this.findOne(id)
    if (user) {
      const updatedUser = { ...user, ...updateUserDto }
      return this.save(updatedUser)
    }
    return undefined
  }
}
