import { Repository, EntityRepository } from 'typeorm'
import { UserEntity } from '@cswp/api-interfaces'
import { CreateUserDto, UpdateUserDto } from '../api/user.dto'
import { HttpException, HttpStatus, Logger } from '@nestjs/common'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  // Logging
  private readonly logger = new Logger(UserRepository.name)

  public async findAll(): Promise<UserEntity[]> {
    this.logger.log('findAll')
    return await this.find({ relations: ['user'] })
  }

  public createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
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
          let userEntity = new UserEntity()
          const hashPassword = userEntity.hashPassword
          userEntity = { ...createUserDto, hashPassword }
          const newUser = this.create(userEntity)
          return this.save(newUser)
        }
      }
    )
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
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
