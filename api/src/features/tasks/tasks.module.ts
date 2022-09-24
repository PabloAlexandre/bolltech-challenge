import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/project.entity';
import { ProjectsServices } from '../projects/projects.service';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksServices } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TasksServices, ProjectsServices],
  controllers: [TasksController],
})
export class TasksModule {}