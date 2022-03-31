import { IUser } from '@cswp/api-interfaces'
import { Injectable } from '@nestjs/common'
import { IUserRepository } from '../domain/iuser.repository'

@Injectable()
export class UserRepository implements IUserRepository {
  create(user: IUser): Promise<IUser> {
    throw new Error('Method not implemented.')
  }
  findAll(): Promise<IUser[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Promise<IUser> {
    throw new Error('Method not implemented.')
  }
  findOneByEmail(email: string): Promise<IUser> {
    throw new Error('Method not implemented.')
  }
  update(id: number, userDetails: any, ownerId: number): Promise<IUser> {
    throw new Error('Method not implemented.')
  }
  delete(id: string, owner: IUser): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
