// some-test-file.spec.ts
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../api/src/app/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    app = await app.init()
    app = await app.listen(3000)
  })

  afterAll(async () => {
    await app.close()
  })

  it('GET /api/meal', () => {
    return request(app.getHttpServer()).get('/docs').expect(200)
    // .expect({ message: 'Welcome to api!' })
  })
})
