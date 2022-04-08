import { Controller, Request, Post, UseGuards, Logger } from '@nestjs/common'
import { LocalAuthGuard } from './auth.guards'
import { AuthService } from './auth.service'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MessagePattern } from '@nestjs/microservices'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private authService: AuthService) {}

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

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    this.logger.log(`loggedIn`)
    try {
      const res = this.authService.validateToken(data.jwt)
      this.logger.log(`loggedIn - res = ${JSON.stringify(res)}`)
      return res
    } catch (error) {
      this.logger.log(error)
      return false
    }
  }
}
