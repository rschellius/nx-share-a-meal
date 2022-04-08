import { Test, TestingModule } from '@nestjs/testing'
import { MealService } from './meal.service'
import { Meal } from './meal.entity'

const mockmeal = {}

xdescribe('mealsService', () => {
  let service: MealService
  // let model: Model<Imeal>

  const mealsArray = [
    {
      id: 0,
      firstName: 'firstname',
      lastName: 'lastname',
      isActive: true,
      password: 'secret',
      emailAdress: 'meal@server.com',
      phoneNumber: '06-12345678'
    },
    {
      id: 0,
      firstName: 'firstname',
      lastName: 'lastname',
      isActive: true,
      password: 'secret',
      emailAdress: 'meal@server.com',
      phoneNumber: '06-12345678'
    }
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealService,
        {
          provide: Meal,
          useValue: {
            new: jest.fn().mockResolvedValue(mockmeal),
            constructor: jest.fn().mockResolvedValue(mockmeal),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<MealService>(MealService)
    // model = module.get<Model<Imeal>>()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return all meals', async () => {
    // jest.spyOn(model, 'find').mockReturnValue({
    //   exec: jest.fn().mockResolvedValueOnce(mealsArray),
    // } as any)
    // const meals = await service.findAll()
    // expect(meals).toEqual(mealsArray)
  })

  it('should insert a new meal', async () => {
    // jest.spyOn(model, 'create').mockImplementationOnce(() =>
    //   Promise.resolve({
    //     firstName: 'firstname',
    //     lastName: 'lastname',
    //   })
    // )
    // const newmeal = await service.create({
    //   id: 0,
    //   firstName: 'firstname',
    //   lastName: 'lastname',
    //   isActive: true,
    //   password: 'secret',
    //   emailAdress: 'meal@server.com',
    //   phoneNumber: '06-12345678',
    // })
    // expect(newmeal).toEqual(mockmeal)
  })
})
