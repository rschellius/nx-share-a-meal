import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true })],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
