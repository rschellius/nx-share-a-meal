// some-test-file.spec.ts
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../../api/src/app/app.module'

import { TypeOrmTestingModule } from '../utils/TypeORMTestingModule'
import { testDatasetSeed } from '../utils/testDataset.seed'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from '../../../api/src/app/user/user.module'
import { MealsModule } from '../../../api/src/app/meal/meal.module'
import { AuthModule } from '../../../api/src/app/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from 'apps/api/src/app/auth/auth.guards'

describe('AppController (e2e)', () => {
  let app: INestApplication
  // let service: SpaceshipsService;

  // beforeAll(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule]
  //   }).compile()

  //   app = moduleFixture.createNestApplication()
  //   app = await app.init()
  //   app = await app.listen(3000)
  // })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingModule(),
        ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),
        AuthModule,
        UsersModule,
        MealsModule
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard
        }
      ]
      // providers: [SpaceshipsService],
    }).compile()

    // service = module.get<SpaceshipsService>(SpaceshipsService);
    // await testDatasetSeed()

    app = moduleFixture.createNestApplication()
    app = await app.init()
    app = await app.listen(3000)
  })

  afterEach(async () => {
    if (app) {
      await app.close()
    }
  })

  it('GET /api/meal', () => {
    return request(app.getHttpServer()).get('/docs').expect(200)
    // .expect({ message: 'Welcome to api!' })
  })
})
