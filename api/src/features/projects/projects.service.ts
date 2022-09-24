import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";

@Injectable()
export class ProjectsServices {
  constructor(
    @InjectRepository(Project)
    protected readonly projectRepository: Repository<Project>
  ) {}

  async getAndValidateProject(user, projectId) {
    const project = await this.projectRepository.findOne({
      where: { user: { id: user }, id: projectId }
    });

    if(!project) throw new UnauthorizedException();

    return project;
  }

  async getProjects(user) {
    return this.projectRepository.find({
      where: { user: { id: user.id }  }
    })
  }

  async getProject(user, id) {
    return this.getAndValidateProject(user.id, id);
  }

  async createProject(user, payload) {
    const project = this.projectRepository.save({
      ...payload,
      user,
    });

    return project;
  }

  async editProject(user, id, payload) {
    const project = await this.getAndValidateProject(user, id);

    await this.projectRepository.update({
      id,
    }, payload);

    return {...project, ...payload};
  }

  async deleteProject(user, id) {
    const project = await this.getAndValidateProject(user, id);

    await this.projectRepository.remove(project);
  }
}