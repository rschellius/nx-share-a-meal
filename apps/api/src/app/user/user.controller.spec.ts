import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { CreateUserDto } from './user.dto'
import { UserService } from './user.service'

describe('Users Controller', () => {
  let controller: UserController
  let service: UserService
  const createUserDto: CreateUserDto = {
    firstName: 'firstname',
    lastName: 'lastname',
    isActive: true,
    password: 'secret',
    emailAdress: 'user@server.com',
    phoneNumber: '06-12345678',
  }

  const mockUser = {
    ...createUserDto,
    id: 1,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'User #1',
                breed: 'Bread #1',
                age: 4,
              },
              {
                name: 'User #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                name: 'User #3',
                breed: 'Breed #3',
                age: 2,
              },
            ]),
            create: jest.fn().mockResolvedValue(createUserDto),
          },
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  })

  describe('create()', () => {
    it('should create a new user', async () => {
      // const createSpy = jest
      //   .spyOn(service, 'create')
      //   .mockResolvedValueOnce(mockUser)
      // await controller.create(createUserDto)
      // expect(createSpy).toHaveBeenCalledWith(createUserDto)
    })
  })

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      expect(controller.findAll(null)).resolves.toEqual([
        {
          name: 'User #1',
          breed: 'Bread #1',
          age: 4,
        },
        {
          name: 'User #2',
          breed: 'Breed #2',
          age: 3,
        },
        {
          name: 'User #3',
          breed: 'Breed #3',
          age: 2,
        },
      ])
      expect(service.findAll).toHaveBeenCalled()
    })
  })
})
