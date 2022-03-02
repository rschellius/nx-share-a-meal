import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './user.dto'
import { User } from './user.entity'
import { ListAllUsersDto } from './user.dto'
import { JwtAuthGuard } from '../auth/auth.guards'
import { Public } from '../common/decorators/decorators'

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Register as a new user' })
  @ApiBody({ type: User, description: 'The new user' })
  @ApiResponse({ status: 201, description: 'OK.', type: [User] })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('create')
    return this.userService.create(createUserDto as User)
  }

  @ApiOperation({
    summary: 'Request your personal user profile',
    description:
      'A logged in user (having a valid JWT token) can request its own user information.'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Returns the user details of the authenticated user',
    type: [User]
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return this.userService.findOne(req.user.userId)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 201,
    description: 'All records',
    type: [User]
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. You need to create a new user first, and login, to get a valid JWT.',
    type: Error
  })
  findAll(@Query() queryParams: ListAllUsersDto): Promise<User[]> {
    this.logger.log('findAll')
    // this.logger.log('queryParams: ', queryParams);
    return this.userService.findAll(/* queryParams */)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single user by id' })
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: User
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, no access',
    type: Error
  })
  findOne(@Param('id') id: string): Promise<User> {
    this.logger.log('findOne id=' + id)
    return this.userService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a single user',
    description:
      'Edit your user details. You can only edit your personal details. Authentication via login required.'
  })
  @ApiBody({ type: User, description: 'the new user properties' })
  @ApiResponse({ status: 201, description: 'OK.', type: [User] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
    @Req() req
  ): Promise<void> {
    this.logger.log('update')
    return this.userService.update(id, updateUserDto, req.user)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBody({ type: 'string', description: 'the id of the user to remove' })
  @ApiResponse({ status: 201, description: 'OK.', type: [User] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: string, @Req() req): Promise<void> {
    this.logger.log('delete user id=' + id)
    return this.userService.delete(id, req.user)
  }
}
