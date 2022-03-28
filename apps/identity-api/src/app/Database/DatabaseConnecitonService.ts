import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConnectionService {
  private readonly connectionString: string;

  constructor(private readonly configService: ConfigService) {
    this.connectionString = this.configService.get<string>(
      'DB_CONNECTION_STRING',
    );
    Logger.log(
      'connecting to ' + this.connectionString,
      'DatabaseConnectionService',
    );
  }

  public get = (): string => this.connectionString;
}
