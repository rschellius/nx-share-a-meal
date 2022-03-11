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

  // public async findById(id: number): Promise<User> {
  //   this.logger.log('findById id=' + id)
  //   return await this.findOne(id)
  // }

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
    // .catch((err) => {
    //   throw new HttpException(err, HttpStatus.BAD_REQUEST)
    // })
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

  // public async destroy(id: number): Promise<void> {
  //   this.logger.log('destroy id=' + id)
  //   const user = await this.findOne(id)
  //   await this.remove(user)
  // }
}
