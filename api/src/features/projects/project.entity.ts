import { BaseEntity } from "src/infrastructure/db/base.entity";
import { Column, ManyToOne, OneToMany } from "typeorm";
import { Task } from "../tasks/task.entity";
import { User } from "../users/user.entity";

export class Project extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}