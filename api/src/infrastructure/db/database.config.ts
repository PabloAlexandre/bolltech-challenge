import { DataSourceOptions } from "typeorm";

export const DatabaseConfig: DataSourceOptions = { 
  type: 'mysql',
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USER || 'api-client',
  password: process.env.DB_PASS || 'pa!ssword',
  database: process.env.DB_NAME || 'todo-bolttech',
  entities: [
    __dirname + '/../../features/**/*.entity{.ts,.js}',
  ],
  synchronize: false,
  migrations: [
    __dirname + '/../../../migrations/**/*{.ts,.js}'
  ],
}