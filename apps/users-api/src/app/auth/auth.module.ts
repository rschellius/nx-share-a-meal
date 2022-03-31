import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { UserRepositoryModule } from '../user/persistence/user.repository.module'

@Module({
  imports: [
    // UsersModule,
    UserRepositoryModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretstring',
      signOptions: { expiresIn: '2 days' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
