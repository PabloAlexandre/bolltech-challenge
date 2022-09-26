import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsServices } from "../projects/projects.service";
import { Task, TaskStatus } from "./task.entity";

@Injectable()
export class TasksServices {
  constructor(
    @InjectRepository(Task)
    protected readonly taskRepository: Repository<Task>,
    protected readonly projectsServices: ProjectsServices
  ) {}

  async getAndValidateTask(userId, taskId) {
    const task = await this.taskRepository.findOne({ where: { id: taskId, project: { user: { id: userId }} } });

    if(!task) throw new UnauthorizedException();

    return task;
  }

  async getTasks(user, project) {
    await this.projectsServices.getAndValidateProject(user.id, project);
 
    return this.taskRepository.find({
      where: { project: { id: project } }
    });
  }

  async getTask(user, id) {
    return this.getAndValidateTask(user.id, id);
  }

  async createTask(user, project, payload) {
    await this.projectsServices.getAndValidateProject(user, project);
  
    const task = this.taskRepository.save({
      ...payload,
      project
    });

    return task;
  }

  async finishTask(user, id) {
    const task = await this.getAndValidateTask(user, id);
    if(task.finishedAt) throw new BadRequestException('Task already finished');

    task.finishedAt = new Date();
    task.status = TaskStatus.DONE;

    await this.taskRepository.update({
      id,
    }, task);

    return task;
  }

  async editTask(user, id, payload) {
    const task = await this.getAndValidateTask(user, id);

    if(task.finishedAt) throw new BadRequestException('Task cannot be edited after finished');

    await this.taskRepository.update({
      id,
    }, payload);

    return {...task, ...payload};
  }

  async deleteTasks(user, id) {
    const task = await this.getAndValidateTask(user, id);
    if(task.finishedAt) throw new BadRequestException('Task cannot be deleted after finished');

    await this.taskRepository.remove(task);
  }
}