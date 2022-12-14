import { BaseEntity } from "src/infrastructure/db/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Project } from "../projects/project.entity";

export enum Roles {
  ADMIN,
  USER
}

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @Column({
    type:"enum", 
    enum: Roles,
    default: Roles.USER
  })
  role: Roles
}