import { Repository, EntityRepository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './user.dto'
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
          return this.save(createUserDto)
        }
      }
    )
    // .catch((err) => {
    //   throw new HttpException(err, HttpStatus.BAD_REQUEST)
    // })
  }

  // public async editUser(
  //   id: number,
  //   updateUserDto: UpdateUserDto
  // ): Promise<User> {
  //   this.logger.log('editUser id=' + id)
  //   let user = await this.findOne(id)
  //   user = { ...user, ...updateUserDto }
  //   await this.save(user)
  //   return user
  // }

  // public async destroy(id: number): Promise<void> {
  //   this.logger.log('destroy id=' + id)
  //   const user = await this.findOne(id)
  //   await this.remove(user)
  // }
}
