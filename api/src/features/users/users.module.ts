import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  providers: [],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}