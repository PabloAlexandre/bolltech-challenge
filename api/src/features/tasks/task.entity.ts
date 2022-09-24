import { BaseEntity } from "src/infrastructure/db/base.entity";
import { Column, ManyToOne } from "typeorm";
import { Project } from "../projects/project.entity";

export enum TaskStatus {
  TODO,
  DONE,
}

export class Task extends BaseEntity {
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @Column()
  description: string;

  @Column({
    type:"enum", 
    enum: TaskStatus,
    array: true,
    default: TaskStatus.TODO
  })
  status: TaskStatus;

  @Column()
  finishedAt: Date;
}