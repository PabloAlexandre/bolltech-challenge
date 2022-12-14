import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsServices } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectsServices],
  controllers: [ProjectsController],
  exports: [ProjectsServices]
})
export class ProjectsModule {}