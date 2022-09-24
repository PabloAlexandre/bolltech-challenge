import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/db/database.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';

@Module({ 
  imports: [DatabaseModule, UsersModule, ProjectsModule],
})
export class AppModule {}
