import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from './user.dto'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  create(user: User): Promise<User> {
    this.logger.log('create')
    return this.userRepository.createUser(user)
  }

  findAll(): Promise<User[]> {
    this.logger.log('findAll')
    return this.userRepository.find({ relations: ['meals'] })
  }

  findOne(id: string): Promise<User> {
    this.logger.log('findOne - id=' + id)
    return this.userRepository.findOne(id)
  }

  findOneByEmail(email: string): Promise<User> {
    this.logger.log('findOneByEmail ' + email)
    return this.userRepository.findOne({ where: { emailAdress: email } })
  }

  async update(
    id: string,
    userDetails: CreateUserDto,
    owner: User
  ): Promise<void> {
    this.logger.log('update user id=' + id)
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new BadRequestException(`User does not exist`)
    }
    if (user !== owner) {
      throw new BadRequestException(`Not allowed to edit`)
    }
    await this.userRepository.update(id, userDetails)
  }

  async delete(id: string, owner: User): Promise<void> {
    this.logger.log('delete user id=' + id)
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new BadRequestException(`User does not exist`)
    }
    if (user !== owner) {
      throw new BadRequestException(`Not allowed to delete`)
    }
    await this.userRepository.delete(id)
  }
}
