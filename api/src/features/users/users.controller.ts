import { Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation
} from '@nestjs/swagger';

@Controller('/users')
@ApiTags('Users')
export class UsersController {

  @Post('/login')
  @ApiOperation({ summary: 'Login Operation' })
  GetUsers(): string {
    return ``;
  }
}
