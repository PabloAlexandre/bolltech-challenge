import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from 'src/infrastructure/crypto/crypto.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersServices } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CryptoService, UsersServices],
  controllers: [UsersController],
})
export class UsersModule {}