import { Controller, Request, Post, UseGuards, Logger } from '@nestjs/common'
import { LocalAuthGuard } from './auth.guards'
import { AuthService } from './auth.service'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private authService: AuthService) {}

  // @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log in using emailAdress and password' })
  @ApiBody({
    description:
      'UserEntity credentials { "emailAdress": email, "password": secret}'
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  async login(@Request() req) {
    this.logger.log('login')
    return this.authService.login(req.user)
  }
}
