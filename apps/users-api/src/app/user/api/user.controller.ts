import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { CreateUserDto, UpdateUserDto, ListAllUsersDto } from './user.dto'
import { UserEntity } from '../persistence/user.entity'
import { JwtAuthGuard } from '../../auth/auth.guards'
import { Public } from '../../common/decorators/decorators'
import { IUserRepository } from '../domain/iuser.repository'
import { IUser } from '@cswp/api-interfaces'

const UserRepository = () => Inject('UserRepository')

@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(@UserRepository() private userRepository: IUserRepository) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Register as a new user' })
  @ApiBody({ type: CreateUserDto, description: 'The new user' })
  @ApiResponse({ status: 201, description: 'OK.', type: [UserEntity] })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    this.logger.log('create')
    return this.userRepository.create(createUserDto as IUser)
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Request your personal user profile',
    description:
      'A logged in user (having a valid JWT token) can request its own user information.'
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the user details of the authenticated user',
    type: [UserEntity]
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return this.userRepository.findOne(req.user.userId)
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 201,
    description: 'All records',
    type: [UserEntity]
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. You need to create a new user first, and login, to get a valid JWT.',
    type: Error
  })
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queryParams: ListAllUsersDto): Promise<IUser[]> {
    this.logger.log('findAll')
    // this.logger.log('queryParams: ', queryParams);
    return this.userRepository.findAll(/* queryParams */)
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single user by id' })
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: UserEntity
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, no access',
    type: Error
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<IUser> {
    this.logger.log('findOne id=' + id)
    return this.userRepository.findOne(id)
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a single user',
    description:
      'Edit your user details. You can only edit your personal details. Authentication via login required.'
  })
  @ApiBody({ type: UserEntity, description: 'the new user properties' })
  @ApiResponse({ status: 201, description: 'OK.', type: [UserEntity] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Not allowed to edit' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ): Promise<IUser> {
    this.logger.log(`update id=${id} user.id=${req.user.userId}`)
    return this.userRepository.update(id, updateUserDto, req.user.userId)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiBody({ type: 'string', description: 'the id of the user to remove' })
  @ApiResponse({ status: 201, description: 'OK.', type: [UserEntity] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Not allowed to delete' })
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Req() req): Promise<void> {
    this.logger.log(`delete user.id=${req.user.userId}`)
    return this.userRepository.delete(id, req.user)
  }
}