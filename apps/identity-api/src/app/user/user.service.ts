import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { UserEntity } from '@cswp/api-interfaces'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  create(user: UserEntity): Promise<UserEntity> {
    this.logger.log('create')
    return this.userRepository.createUser(user)
  }

  findAll(): Promise<UserEntity[]> {
    this.logger.log('findAll')
    return this.userRepository.find({ relations: ['meals'] })
  }

  findOne(id: string): Promise<UserEntity> {
    this.logger.log('findOne - id=' + id)
    return this.userRepository.findOne(id)
  }

  findOneByEmail(email: string): Promise<UserEntity> {
    this.logger.log('findOneByEmail ' + email)
    return this.userRepository.findOne({ where: { emailAdress: email } })
  }

  async update(
    id: number,
    userDetails: UpdateUserDto,
    ownerId: number
  ): Promise<UserEntity> {
    this.logger.log(`update user.id=${ownerId}`)
    const userToUpdate = await this.userRepository.findOne(id)
    if (!userToUpdate) {
      throw new BadRequestException(`UserEntity does not exist`)
    }
    if (userToUpdate.id !== ownerId) {
      throw new BadRequestException(`Not allowed to edit`)
    }
    return this.userRepository.updateUser(id, userDetails)
  }

  async delete(id: string, owner: UserEntity): Promise<void> {
    this.logger.log('delete user id=' + id)
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new BadRequestException(`UserEntity does not exist`)
    }
    if (user !== owner) {
      throw new BadRequestException(`Not allowed to delete`)
    }
    await this.userRepository.delete(id)
  }
}
