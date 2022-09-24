import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';
import { CreateUserRequestDTO } from './dtos/CreateUserRequest';
import { LoginRequestDTO } from './dtos/LoginRequest';

@Controller('')
@ApiTags('Users')
export class UsersController {

  @Post('/login')
  @ApiOperation({ summary: 'Login Operation' })
  @ApiResponse({ status: 200, description: "Payload with user credentials"})
  @ApiResponse({ status: 404, description: "User not found"})
  GetUsers(@Body() userLoginCredentials: LoginRequestDTO): string {
    return ``;
  }

  @Post('/users')
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, description: "Payload with user credentials"})
  @ApiResponse({ status: 400, description: "Validation Error"})
  createUser(@Body() user: CreateUserRequestDTO): string {
    return ``;
  }
}
