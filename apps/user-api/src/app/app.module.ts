import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { UserEntity, Meal } from '@cswp/api-interfaces'
// import mysql2 required to add package to generated dist/package.json
import * as mysql from 'mysql2'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOSTNAME'),
        port: +configService.get<number>('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASENAME'),
        entities: [UserEntity, Meal],
        synchronize: true,
        retryAttempts: 1
      }),
      inject: [ConfigService]
    }),

    UserModule
  ]
})
export class AppModule {}
